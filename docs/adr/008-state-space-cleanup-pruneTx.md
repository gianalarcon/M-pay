# ADR-008: State-Space Cleanup via `pruneTx`

**Date:** 2026-04-22
**Status:** Accepted
**Context:** Midnight mainnet deployment rubric ([MIP-?? contract-deployment-rubric.md](https://github.com/midnightntwrk/midnight-improvement-proposals/blob/main/mps/contract-deployment-rubric.md)), MPay contract (10 → 11 impure circuits), Compact runtime 0.15.0

## Problem

The mainnet deployment rubric scores contracts across three risk categories; a score of 3 in any single category **immediately blocks deployment**. MPay's baseline would fail on **state-space-at-risk (tier 3)**:

Seven ledger maps key on `txId` and grow on every `propose`, with **no cleanup mechanism**:

- `txTypes`, `txStatuses`, `txApprovalCounts`
- `txData0`, `txData1`, `txData2`, `txData3`

Any signer can propose unlimited times → unbounded accumulation → rubric tier 3.

`txNullifiers` also grows monotonically, but that is a core anti-replay property (like Ethereum nonces) and cannot be pruned without breaking security.

## Decision

Add a single `pruneTx(txId: Uint<64>)` circuit that removes the seven `txId`-keyed fields for transactions meeting either of two criteria:

1. **Executed** (`txStatuses[txId] == 2`) — history is no longer needed; always prunable.
2. **Stale pending** (`txStatuses[txId] == 0` AND `txCounter.read() > txId + 100`) — at least 100 newer proposals exist, so this one is presumed abandoned. The 100-proposal buffer is the griefing defense.

`txNullifiers` is intentionally **not** touched.

## Design choices

### Open to anyone (no signer gate)

`pruneTx` is monotonic cleanup — it cannot be weaponized:

- Pruning an executed tx: the outcome is already finalized on-chain; removing history does not change ledger semantics.
- Pruning a stale pending tx: only eligible after 100+ newer proposals exist, so the proposal has clearly been abandoned.

Gas-payer is whoever calls it (typically a signer doing housekeeping). Same pattern as the existing `stampReady(txId)` rescue circuit.

### Position-based staleness (N = 100) instead of time-based

Compact does not expose block time primitives we can rely on in a single circuit read. Position-based staleness uses `txCounter` (already read in this circuit) as the clock:

- **N = 100**: large enough that normal operation (propose → approve → execute within a few blocks) never hits the threshold; small enough to let cleanup catch up on busy multisigs.
- **Tuning**: N can be raised (200, 500) if a deployment expects long-running proposals. Dropping below ~20 risks pruning proposals still in active consideration.

### Single circuit instead of `pruneExecutedTx` + `pruneStaleProposal`

Two separate circuits would push the impure count from 10 to 12, against the empirical ~12-13 deploy ceiling observed in ADR-001 / ADR-003. One combined circuit stays at 11 with a branch on `txStatuses[txId]`.

### Not touching `txNullifiers`

A nullifier is `hash(signerSecret, txIdPad)`. Removing nullifiers would let signers replay approvals on a re-incarnated `txId`. Since `txCounter` only increments, a pruned `txId` is never re-used for a new proposal — the orphan nullifiers in the set cost storage but preserve the anti-replay invariant. Treated as bounded-by-usage protocol state (analogous to Ethereum account nonces).

## Trade-offs

| Aspect | Without `pruneTx` | With `pruneTx` |
|--------|-------------------|----------------|
| Rubric state-space score | 3 (blocked) | 2 (passes) |
| Impure circuit count | 10 | 11 |
| Cleanup trigger | — | Manual, anyone, per-txId |
| Cleanup gas | — | One tx per pruned txId (no batch — see ADR rationale) |
| `txNullifiers` growth | Unbounded | Unbounded (intentional) |

## UX implementation

`web/src/components/TransactionsTab.tsx` computes `canPrune` per row:

- `isExecuted` → always prunable
- `isPending && maxTxId > tx.txId + 100n` → prunable (stale)
- Otherwise → no button

`maxTxId` is derived from the tx list in memory (equivalent to `txCounter.read()` since the counter only increments). No extra contract read required.

## Rubric self-assessment impact

State-space-at-risk justification after this ADR:

- Executed tx data: `pruneTx` callable by anyone → bounded cleanup
- Stale pending (100+ behind head): `pruneTx` callable by anyone → bounded cleanup
- Active pending: bounded by signer count × signer discipline; signer gate on `propose` prevents public spam
- `txNullifiers`: protocol necessity (anti-replay), analogous to Ethereum nonces

→ State grows linearly with activity, with explicit cleanup controls → **tier 2**.

## Related

- Mainnet deployment rubric: [`mps/contract-deployment-rubric.md`](https://github.com/midnightntwrk/midnight-improvement-proposals/blob/main/mps/contract-deployment-rubric.md)
- Example approved-tier pattern: Sundae's `mint-vault-example.md` (grows linearly with users, admin prune available → tier 2)
- Example approved-tier pattern: `proof-of-spy.md` (explicit `delete_game` circuit → tier 1)
- ADR-001 — circuit count constraints
- ADR-003 — three-phase setup and circuit budget

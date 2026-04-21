# Reproducer — Substrate error 186 (EffectsCheckFailure) on `sendShielded` + `insertCoin`-on-change

MPay is a privacy-preserving multisig wallet on Midnight (Preprod). Its
`executeTransfer` circuit sends a shielded coin from a contract-owned vault
to a recipient, returning any leftover value ("change") back into the vault
via `vaultCoin.insertCoin`.

With this branch:

- **Full-coin transfer** (`amount == coin.value`): works. The `change.is_some`
  branch is skipped, `insertCoin` never runs, transaction succeeds.
- **Partial-coin transfer** (`amount < coin.value`): fails at tx submission
  with `ExtrinsicStatus:: 1010: Invalid Transaction: Custom error: 186`.

Error code 186 maps to `MalformedError::EffectsCheckFailure` per
[midnight-node/ledger/src/versions/common/types.rs](https://github.com/midnightntwrk/midnight-node/blob/main/ledger/src/versions/common/types.rs).

The circuit code is identical between the two scenarios — only the runtime
input differs. This suggests the validator rejects the tx when `insertCoin`
is actually invoked in combination with `sendShielded`, not when the circuit
merely contains both operations.

---

## Relevant code

[`contract/src/mpay.compact`](contract/src/mpay.compact) — `executeTransfer`:

```compact
const amount = transferAmount();
const result = sendShielded(coin, recipient, disclose(amount));
if (result.change.is_some) {
  depositCounter.increment(1);
  const newKey = depositCounter.read() as Field as Bytes<32>;
  vaultCoin.insertCoin(disclose(newKey), result.change.value, selfAsRecipient());
}
vaultCoin.remove(disclose(coinKey));
txStatuses.insert(disclose(txId), disclose(2 as Uint<8>));
```

`MPay` contract has 17 ledger fields. `executeTransfer` uses 3 reads:
`signers.member`, `txStatuses.lookup`, `vaultCoin.lookup`.

---

## Prerequisites

- Node 20+, npm
- Lace wallet extension installed (Midnight preprod) with some **tNIGHT** for gas
- Midnight proof server reachable (Lace uses its configured one by default)

## Setup — build and run the dApp

```bash
npm install
cd contract && npm run compact && npm run build && cd ..
cd web && npm run dev
```

Open the printed URL in a browser that has Lace. The dApp lands on the
**Connect** screen.

## Setup — connect, deploy token, mint, deploy multisig

1. **Connect wallet**: click **Connect Wallet**. Lace will prompt —
   approve. The dApp generates a signer secret from `signData` and stores
   it in `localStorage`. The sidebar shows your identity.

2. **Deploy the token contract** (left sidebar, mode = *Token*):
   - Click **Deploy Token Contract**.
   - Wait for confirmation toast. The token contract address is shown.

3. **Mint MPAY tokens**:
   - In the Token page, enter **amount = 200** (atomic units).
   - Recipient defaults to your shielded address — leave as is.
   - Click **Mint**. Wait for the toast. Your wallet now holds 200 MPAY.

4. **Switch to Multisig mode** in the sidebar (top-left mode toggle).

5. **Deploy the multisig contract**:
   - In the **Setup** screen, set **Threshold = 1** (important — this lets a
     single signer approve + execute without needing co-signers).
   - Click **Deploy Multisig**.
   - Wait for the toast. The dApp saves the contract address and shows the
     vault key (copy + back it up; we need it for the propose step).

6. **Finalize the multisig**:
   - The dApp moves to the **Init Signers** phase. You are already added as
     signer #1. No action needed (since threshold = 1).
   - Click **Finalize**. Wait for the toast. The dApp navigates to the
     **Dashboard** with tabs: Overview, Deposit, Propose, Signers, Transactions.

## Setup — deposit two vault coins

We need two vault coins of 100 MPAY each: one for Scenario A (will be
consumed), one for Scenario B.

7. Open the **Deposit** tab.
8. Enter **amount = 100** and click **Deposit to Vault**. Wait for the toast.
9. Repeat: enter **amount = 100** again and click **Deposit to Vault** again.
10. Verify in the **Overview** tab (or the coin list in the Propose tab)
    that the vault holds **two coins of value 100 each**.

---

## Scenario A — full-coin transfer (passes)

1. Open the **Propose** tab.
2. Enter **recipient** — any valid `mn_shield-addr_preprod1…`. Your own
   shielded address is fine; click **Use my shielded address** to auto-fill.
3. **Source Coin**: pick either of the two 100-MPAY vault coins.
4. **Amount** auto-fills to `100`. Leave as is.
5. Click **Propose Encrypted Transfer**.
   - Threshold = 1, so the proposal is auto-approved and stamped `READY`.
6. Open the **Transactions** tab. The proposal row shows status `READY`.
7. Click **Execute**.

**Expected result**: transaction is signed, submitted, and finalized. Row
status becomes `EXECUTED`. `change.is_some` was `false`, so `insertCoin`
was skipped. The vault now has one remaining 100-MPAY coin.

## Scenario B — partial-coin transfer (fails 186)

1. Open the **Propose** tab.
2. Enter **recipient** (same as Scenario A).
3. **Source Coin**: pick the remaining 100-MPAY vault coin.
4. **Amount**: auto-fills to `100` — **overwrite it to `40`**.
   - The UI shows an amber warning: *"Partial transfer — change will be
     returned to vault via `insertCoin`-on-change…"*
5. Click **Propose Encrypted Transfer**.
   - Proposal is auto-approved and stamped `READY` (threshold = 1).
6. Open the **Transactions** tab. The new proposal row shows status `READY`.
7. Click **Execute**.

**Expected result**: transaction signs and submits, then the node rejects it.

- The dApp shows a generic toast: `Execute #<id> (Transfer) failed: …`
- The browser devtools console only prints a generic submission error.
- **The exact error appears in the Lace wallet's own console/logs**:

  ```
  ExtrinsicStatus:: 1010: Invalid Transaction: Custom error: 186
  ```

To view Lace's logs: open the Lace extension popup, use its built-in
developer tools (or inspect the extension's background page) — the
raw Substrate `ExtrinsicStatus` is emitted there, not in the dApp page.

---

The only difference between A and B is the runtime `amount` passed through
the `transferAmount()` witness — the circuit bytecode and verifier key are
identical.

---

## Evidence this is a `fields + reads` budget limit

We previously bisected using a standalone test contract with the same δ
circuit (`sendShielded` + `insertCoin` + N dummy reads), progressively
adding dummy ledger fields:

| Ledger fields | Reads | insertCoin | Result |
|---------------|-------|-----------|--------|
| 8 | 5 | yes | pass |
| 12 | 5 | yes | pass |
| 14 | 5 | yes | pass |
| 15 | 5 | yes | **pass** |
| 16 | 5 | yes | **186** |
| 17 | 5 | yes | 186 |

Without `insertCoin` (`sendShielded` only), the budget is looser:

| Ledger fields | Reads | insertCoin | Result |
|---------------|-------|-----------|--------|
| 17 | 1 | no | pass |
| 17 | 3 | no | **pass** (prior working MPay, Option A) |
| 17 | 5 | no | **186** |

Pattern observed: **`fields + reads ≤ ~20` when the circuit uses
`sendShielded`**, and tighter (≈≤15 fields at 5 reads) when `insertCoin` is
also present.

Dropping ledger fields to fit the budget means dropping core multisig
features (tx queue, approvals, nullifiers, encrypted proposal data).
---

## Business impact

The inability to do `insertCoin`-on-change inside a `sendShielded` circuit
blocks any contract that wants to:

- Hold a shielded token pool and pay arbitrary amounts out (DAO treasury,
  multisig vault, payroll, escrow, DEX pool)
- Accept partial-value operations where "change" must return to the contract

Current workaround in MPay would be to force full-coin-spend only, meaning
users must deposit exact amounts upfront and cannot transfer arbitrary
values. This is a major UX regression vs normal token flows.

---

## Files referenced

- Contract with the failing pattern: [`contract/src/mpay.compact`](contract/src/mpay.compact) (`executeTransfer`)
- Witness declarations: [`contract/src/witnesses.ts`](contract/src/witnesses.ts)
- API call that sets `transferAmount` witness: [`api/src/index.ts`](api/src/index.ts) (`executeTransfer`)
- Full investigation timeline: [`docs/SHIELDED_TOKEN_STATUS.md`](docs/SHIELDED_TOKEN_STATUS.md)
- Prior ADR: [`docs/adr/001-witness-required-for-execute-circuits.md`](docs/adr/001-witness-required-for-execute-circuits.md)

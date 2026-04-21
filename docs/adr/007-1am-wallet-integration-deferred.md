# ADR-007: 1AM Wallet Integration Deferred

**Date:** 2026-04-21
**Status:** Deferred (re-evaluate when 1AM ships custom shielded token support)
**Context:** 1AM wallet v1 (preprod), DApp Connector API v4.0

## Problem

Evaluated replacing / supplementing Lace with 1AM as an alternative Midnight
wallet. 1AM advertises itself as "The first wallet built for Midnight" with
built-in DUST sponsorship, in-browser ZK proving, and standard v4 DApp Connector
API.

Goal: confirm the dApp works end-to-end with 1AM so users can pick either
wallet.

## Investigation

Tested all circuits in M-pay against 1AM (Lace disabled).

| Circuit | Wallet op | Result |
|---------|-----------|--------|
| `connect` | `connect` + `getShieldedAddresses` + `signData` | OK |
| Deploy Token | `sendShielded` (mint to self, no spend) | OK |
| Mint Token | `sendShielded` | OK |
| Deploy Multisig | `sendShielded` | OK |
| **Deposit** | `receiveShielded` (spend user's MPAY UTXO) | **FAIL** |

Deposit failed with chain rejection:

```
ExtrinsicStatus:: 1010: Invalid Transaction: Custom error: 138
```

## Root Cause

Error code 138 maps to `MalformedError::BalanceCheckOverspend` per
[midnight-node/ledger/src/versions/common/types.rs:367](https://github.com/midnightntwrk/midnight-node/blob/main/ledger/src/versions/common/types.rs#L367):

```rust
MalformedError::BalanceCheckOverspend => 138,
```

Meaning: the submitted transaction has token outputs that exceed token inputs
— an unbalanced transaction.

Confirmed via side-by-side `balanceUnsealedTransaction` comparison on an
identical unbalanced deposit tx:

| Wallet | Unbalanced | Balanced | **Delta** |
|---|---|---|---|
| 1AM  | 20810 chars | 27344 chars | **3,267 bytes** |
| Lace | 20808 chars | 47420 chars | **13,306 bytes** |

Delta difference: **10,039 bytes**. This matches Midnight's documented Zswap
proof sizes ± ~400 bytes metadata:

- [`INPUT_PROOF_SIZE = 4,832`](https://github.com/midnightntwrk/midnight-ledger/blob/main/zswap/src/structure.rs#L630) (MPAY spend)
- [`OUTPUT_PROOF_SIZE = 4,832`](https://github.com/midnightntwrk/midnight-ledger/blob/main/zswap/src/structure.rs#L632) (MPAY change back to user)
- Metadata (nullifier, commitments, ciphertext): ~400 bytes

Total: **~10,032 bytes ≈ 10,039 bytes observed.**

1AM's balancer **does not add a shielded coin spend + change output for custom
tokens (MPAY)**. It reads custom token balances correctly (`getShieldedBalances`
returns MPAY) but cannot spend them when a contract calls `receiveShielded`.

Context from [midnight-node changelog](https://github.com/midnightntwrk/midnight-node/blob/main/.changes_archive/node-0.17.0-rc1/changed/remove-redundant-proofs.md):

> "This should help avoid `BalanceCheckOverspend` errors from the ledger,
> though we should also be paying a little more than explicitly needed (which
> will definitely avoid them)."

Team Midnight explicitly recognises `BalanceCheckOverspend` as a wallet-side
balancing failure mode.

1AM's own settings page acknowledges the restriction indirectly:
> "Local, custom, and WASM proof modes are disabled in this release"

## Decision

**Do not integrate 1AM at this time.** The limitation is on the wallet side,
not fixable client-side. Every M-pay core flow (deposit, propose transfer,
execute transfer) requires spending MPAY from the user's wallet; all would
fail identically.

Keeping Lace as the sole supported wallet.

## Revisit condition

Re-evaluate 1AM integration when any of:

- 1AM release notes mention "custom shielded token" or "Zswap input balancing"
  support
- The settings page no longer shows "Local, custom, and WASM proof modes
  disabled"
- Running the deposit flow against a newer 1AM build returns a non-138 error
  (or succeeds)

Required changes at that point (code-only, small):

1. `providers.ts:connectToWallet` — make `getConnectionStatus()` call
   defensive (1AM does not expose it).
2. Generalise error messages to not hardcode "Lace".
3. Add a wallet picker in `App.tsx` if users have both Lace and 1AM installed
   (`window.midnight` can hold multiple compatible wallets; current code
   picks the first match arbitrarily).

## Related

- [1AM Developers page](https://1am.xyz/developers)
- [Midnight DApp Connector v4 spec](https://github.com/midnightntwrk/midnight-dapp-connector-api/blob/main/docs/api/_media/SPECIFICATION.md)
- [midnight-node/pallets/midnight/src/lib.rs:560](https://github.com/midnightntwrk/midnight-node/blob/main/pallets/midnight/src/lib.rs#L560) — `invalid_transaction()` wraps error codes
- [midnight-ledger zswap structure](https://github.com/midnightntwrk/midnight-ledger/blob/main/zswap/src/structure.rs)

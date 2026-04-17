import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  localSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  initSigner(context: __compactRuntime.CircuitContext<PS>,
             commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  finalize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  deposit(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proposeTransfer(context: __compactRuntime.CircuitContext<PS>,
                  to_0: { bytes: Uint8Array },
                  amount_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proposeAddSigner(context: __compactRuntime.CircuitContext<PS>,
                   newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      targetCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      newThreshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  approveTx(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeTransfer(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeAddSigner(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  initSigner(context: __compactRuntime.CircuitContext<PS>,
             commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  finalize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  deposit(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proposeTransfer(context: __compactRuntime.CircuitContext<PS>,
                  to_0: { bytes: Uint8Array },
                  amount_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proposeAddSigner(context: __compactRuntime.CircuitContext<PS>,
                   newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      targetCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      newThreshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  approveTx(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeTransfer(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeAddSigner(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  deriveCommitment(secret_0: Uint8Array): Uint8Array;
  computeNullifier(secret_0: Uint8Array, txIdPad_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  deriveCommitment(context: __compactRuntime.CircuitContext<PS>,
                   secret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  computeNullifier(context: __compactRuntime.CircuitContext<PS>,
                   secret_0: Uint8Array,
                   txIdPad_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  initSigner(context: __compactRuntime.CircuitContext<PS>,
             commitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  finalize(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  deposit(context: __compactRuntime.CircuitContext<PS>, amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  proposeTransfer(context: __compactRuntime.CircuitContext<PS>,
                  to_0: { bytes: Uint8Array },
                  amount_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  proposeAddSigner(context: __compactRuntime.CircuitContext<PS>,
                   newCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      targetCommitment_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  proposeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      newThreshold_0: bigint): __compactRuntime.CircuitResults<PS, bigint>;
  approveTx(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeTransfer(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeAddSigner(context: __compactRuntime.CircuitContext<PS>, txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeRemoveSigner(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeSetThreshold(context: __compactRuntime.CircuitContext<PS>,
                      txId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly tokenColor: Uint8Array;
  signers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly signerCount: bigint;
  readonly threshold: bigint;
  readonly owner: Uint8Array;
  readonly finalized: boolean;
  readonly txCounter: bigint;
  txTypes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  txStatuses: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  txApprovalCounts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { read(): bigint }
  };
  txNullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  txAmounts: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  txRecipients: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): { bytes: Uint8Array };
    [Symbol.iterator](): Iterator<[bigint, { bytes: Uint8Array }]>
  };
  txTargetSigners: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Uint8Array;
    [Symbol.iterator](): Iterator<[bigint, Uint8Array]>
  };
  txNewThresholds: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               initialThreshold_0: bigint,
               color_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;

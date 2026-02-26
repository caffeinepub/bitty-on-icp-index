import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface Transaction {
    memo: string;
    operation: TransactionOperation;
    timestamp: bigint;
    index: bigint;
}
export interface BurnOperation {
    from: Uint8Array;
    amount: bigint;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type TransactionOperation = {
    __kind__: "burn";
    burn: BurnOperation;
} | {
    __kind__: "mint";
    mint: MintOperation;
} | {
    __kind__: "transfer";
    transfer: TransferOperation;
};
export interface Icrc1TransactionWithId {
    id: bigint;
    transaction: Icrc1Transaction;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface MintOperation {
    to: Uint8Array;
    amount: bigint;
}
export interface Icrc1Transaction {
    to?: Uint8Array;
    fee?: bigint;
    from?: Uint8Array;
    memo?: Uint8Array;
    created_at_time?: bigint;
    amount: bigint;
}
export interface TransactionWithDetail {
    transaction_type: string;
    transaction: Transaction;
    network: string;
    amount_adjusted: number;
    transfer_to?: Principal;
    value_usd: number;
    augmented_memo: string;
    amount: bigint;
    transfer_from?: Principal;
}
export interface http_header {
    value: string;
    name: string;
}
export interface TransferOperation {
    to: Uint8Array;
    fee: bigint;
    from: Uint8Array;
    amount: bigint;
}
export interface backendInterface {
    cacheIcTransaction(_transaction: Icrc1TransactionWithId): Promise<boolean>;
    getAllIcTransactions(_maxResults: bigint, _includeMarkets: boolean, _sortField: string, _search: string, _reverse: boolean): Promise<Array<Icrc1TransactionWithId>>;
    getRecentTransactions(limit: bigint, offset: bigint): Promise<Array<TransactionWithDetail>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}

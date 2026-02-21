import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type PriceResultNat = {
    __kind__: "completed";
    completed: {
        value: bigint;
    };
};
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type AssetSymbol = string;
export interface HolderInfo {
    principal: Principal;
    balance: bigint;
    percentage: number;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    getHolderAddress(_address: Principal): Promise<HolderInfo>;
    getMetrics(): Promise<{
        marketCap: number;
        volume24h: number;
        price: number;
    }>;
    getUniqueHolderAddresses(): Promise<Array<HolderInfo>>;
    swapTokens(_fromToken: AssetSymbol, _toToken: AssetSymbol, amount: bigint): Promise<PriceResultNat>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    validateAddress(_address: Uint8Array): Promise<boolean>;
}

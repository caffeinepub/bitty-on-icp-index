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
export interface HolderInfo {
    principal: Principal;
    balance: bigint;
    percentage: number;
}
export type AssetSymbol = string;
export interface backendInterface {
    getHolderAddress(_address: Principal): Promise<HolderInfo>;
    getUniqueHolderAddresses(): Promise<Array<HolderInfo>>;
    swapTokens(_fromToken: AssetSymbol, _toToken: AssetSymbol, amount: bigint): Promise<PriceResultNat>;
    validateAddress(_address: Uint8Array): Promise<boolean>;
}

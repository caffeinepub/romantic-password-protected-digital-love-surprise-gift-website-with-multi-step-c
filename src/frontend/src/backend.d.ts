import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface GiftPage {
    id: string;
    mainTitle: string;
    owner: Principal;
    collagePositions: Array<[bigint, bigint, Uint8Array]>;
    createdAt: Time;
    tldr: string;
    mainBlob: Uint8Array;
    dateHint: string;
}
export interface backendInterface {
    deleteGiftPage(giftId: string): Promise<void>;
    getGiftPage(giftId: string): Promise<GiftPage>;
    getGiftPageIdsAndTitlesByOwner(owner: Principal): Promise<Array<[string, string]>>;
    getGiftPageTitleAndId(giftId: string): Promise<[string, string]>;
    getGiftPages(): Promise<Array<GiftPage>>;
    getGiftPagesByOwner(owner: Principal): Promise<Array<GiftPage>>;
    saveGiftPage(tldr: string, mainTitle: string, mainBlob: Uint8Array, dateHint: string, collagePositions: Array<[bigint, bigint, Uint8Array]>): Promise<string>;
}

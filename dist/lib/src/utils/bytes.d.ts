/// <reference types="node" />
import { BigNumber } from "ethers";
export declare class BytesUtils {
    static encodeBigInt(number: bigint): Buffer;
    static arraycopy(src: any, startPos: any, dest: any, destPos: any, len: any): any;
    static bytesToBase64(bytes: Buffer): string;
    static bytesToHex(bytes: Buffer): string;
    static hexToBytes(hex: string): number[];
    static leftPadBytes(bytes: Buffer, size: number): Buffer;
    static longToBytes(longValue: any): Buffer;
    static bigIntToBytes(b: bigint, numBytes: number): Buffer;
    static numberToBytes(num: number, numBytes: number): Buffer;
    static stringToBytes(str: string, numBytes: number): Buffer;
    static numberOrStringToBytes(input: number | string | BigNumber): Buffer;
}

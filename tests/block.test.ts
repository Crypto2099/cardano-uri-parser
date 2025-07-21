import {parse, safeParse, BlockUri, CardanoUriError} from "../src";
import {failIfNull} from "./failIfNull";

describe("Block URI", () => {
    test("parses block URI with hash", () => {
        const uri = "web+cardano://block?hash=c6a8976125193dfae11551c5e80a217403d953c08ebbd69bba904d990854011f";
        const result = failIfNull(safeParse(uri), "Failed to parse block URI") as BlockUri;
        expect(result.type).toBe("block");
        expect(result.block_hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    test("parses block URI with height", () => {
        const uri = "web+cardano://block?height=12345678890";
        const result = failIfNull(safeParse(uri), "Failed to parse block URI") as BlockUri;
        expect(result.type).toBe("block");
        expect(result.block_height).toBe(12345678890);
    });

    test("throws if block URI missing hash and height", () => {
        const uri = "web+cardano://block";
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test("throws if block hash is invalid", () => {
        const uri = "web+cardano://block?hash=invalidhash";
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test("throws if block height is invalid", () => {
        const uri = "web+cardano://block?height=abc";
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if block hash is too short', () => {
        const uri = 'web+cardano://block?hash=abc123';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if block height is negative', () => {
        const uri = 'web+cardano://block?height=-42';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if both hash and height are present', () => {
        const uri = 'web+cardano://block?hash=c6a8976125193dfae11551c5e80a217403d953c08ebbd69bba904d990854011f&height=123';
        // Depending on spec: you can decide to allow or throw, here we assume THROW.
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });
});

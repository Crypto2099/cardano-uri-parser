import {parse, safeParse, CardanoUriError, PayUri} from "../src";
import {failIfNull} from "./failIfNull";

describe("Pay URI handler", () => {
    const addr = "addr1q93l79hdpvaeqnnmdkshmr4mpjvxnacqxs967keht465tt2dn0z9uhgereqgjsw33ka6c8tu5um7hqsnf5fd50fge9gq4lu2ql";
    const byron = "Ae2tdPwUPEZ6sE74qDJ6xL3MnLWVL5MtF6NcdX3mVJ6zHr5ZQ7mEKyVxgkP";
    const bad_address = "addr1abc123";

    test("parses minimal pay URI", () => {
        const uri = `web+cardano://pay/${addr}`;
        const result = failIfNull(safeParse(uri), "Failed to parse") as PayUri;
        expect(result.address).toBe(addr);
    });

    test("parses with lovelace", () => {
        const uri = `web+cardano://pay/${addr}?l=1000000`;
        const result = failIfNull(safeParse(uri), "Failed to parse") as PayUri;
        expect(result.lovelace).toBe(1000000);
    });

    test("parses with paymentId and note", () => {
        const uri = `web+cardano://pay/${addr}?i=invoice123&n=Thanks%20for%20lunch`;
        const result = failIfNull(safeParse(uri), "Failed to parse") as PayUri;
        expect(result.paymentId).toBe("invoice123");
        expect(result.note).toBe("Thanks for lunch");
    });

    test("parses with tokens", () => {
        const uri = `web+cardano://pay/${addr}?t=asset1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq|10`;
        const result = failIfNull(safeParse(uri), "Failed to parse") as PayUri;
        expect(result.tokens![0].assetId).toBe("asset1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
        expect(result.tokens![0].quantity).toBe(10);
    });

    test("parses Byron address", () => {
        const uri = `web+cardano://pay/${byron}`;
        const result = failIfNull(safeParse(uri), "Failed to parse") as PayUri;
        expect(result.address).toBe(byron);
    });

    test("throws on invalid address", () => {
        const uri = `web+cardano://pay/${bad_address}`;
        expect(() => parse(uri)).toThrow(CardanoUriError);
    })

    test("throws on invalid token quantity", () => {
        const uri = `web+cardano://pay/${addr}?t=asset1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq|-1`;
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test("throws on negative lovelace", () => {
        const uri = `web+cardano://pay/${addr}?l=-100`;
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test("throws on invalid token format", () => {
        const uri = `web+cardano://pay/${addr}?t=badasset|10`;
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test("safeParse returns null on invalid", () => {
        const uri = `web+cardano://pay/`;
        const result = safeParse(uri);
        expect(result).toBeNull();
    });
});

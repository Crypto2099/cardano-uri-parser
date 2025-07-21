import {parse, safeParse, DefaultUri, CardanoUriError} from "../src";
import {failIfNull} from "./failIfNull";

describe("Default URI (basic payment)", () => {
    const shelleyMainnet = "web+cardano://addr1q93l79hdpvaeqnnmdkshmr4mpjvxnacqxs967keht465tt2dn0z9uhgereqgjsw33ka6c8tu5um7hqsnf5fd50fge9gq4lu2ql?amount=42";
    const shelleyTestnet = "web+cardano://addr_test1vqg4jwm93g4l7f8c0an9v7ljafefr8q5x0l43lx0v3gdyuqztnrja?amount=10";
    const byronBootstrap = "web+cardano://DdzFFzCqrhsxK6ZtpKf6r17Zh6eAzGyeh1i9Sc72X7DjZKXGdp5Ba1DY4q1zfsPuBBP1DQP7rM2wPGb4EyLkgD1PZ6F2jcB4xgWYThjg";
    const byronIcarus = "web+cardano://Ae2tdPwUPEZ6sE74qDJ6xL3MnLWVL5MtF6NcdX3mVJ6zHr5ZQ7mEKyVxgkP";
    const invalidAddress = "web+cardano://invalid123";

    test("Shelley mainnet detection", () => {
        const result = failIfNull(parse(shelleyMainnet), "Failed") as DefaultUri;
        expect(result.era).toBe("shelley");
        expect(result.network).toBe("mainnet");
    });

    test("Shelley testnet detection", () => {
        const result = failIfNull(parse(shelleyTestnet), "Failed") as DefaultUri;
        expect(result.era).toBe("shelley");
        expect(result.network).toBe("testnet");
    });

    test("Byron bootstrap detection", () => {
        const result = failIfNull(parse(byronBootstrap), "Failed") as DefaultUri;
        expect(result.era).toBe("byron");
        expect(result.network).toBe("mainnet");
    });

    test("Byron Icarus detection", () => {
        const result = failIfNull(parse(byronIcarus), "Failed") as DefaultUri;
        expect(result.era).toBe("byron");
        expect(result.network).toBe("mainnet");
    });

    test("Throws on invalid address", () => {
        expect(() => parse(invalidAddress)).toThrow(CardanoUriError);
    });

    test("safeParse returns null on invalid address", () => {
        const result = safeParse(invalidAddress);
        expect(result).toBeNull();
    });
});

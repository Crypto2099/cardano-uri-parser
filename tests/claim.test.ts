import { parse, safeParse, ClaimUri, CardanoUriError } from '../src';
import { failIfNull } from './failIfNull';

describe('Claim URI', () => {
    const validUri = 'web+cardano://claim/v1?faucet_url=https://faucet.example.com&code=abc123';
    const invalidUri = 'web+cardano://claim/v1?code=abc123';

    test('parse() - throws on claim URI with invalid version', () => {
        const badUri = 'web+cardano://claim/abc?faucet_url=https://example.com';
        expect(() => parse(badUri)).toThrow(CardanoUriError);
    });

    test('parse() - parses valid claim v1 URI', () => {
        const result = failIfNull(parse(validUri), 'Claim URI parsing failed') as ClaimUri;
        expect(result.version).toBe(1);
        expect(result.faucet_url).toBe('https://faucet.example.com');
        expect(result.code).toBe('abc123');
    });

    test('safeParse() - parses valid claim v1 URI', () => {
        const result = failIfNull(safeParse(validUri), 'safeParse failed') as ClaimUri;
        expect(result.faucet_url).toBe('https://faucet.example.com');
    });

    test('parse() - throws on missing faucet_url', () => {
        expect(() => parse(invalidUri)).toThrow(CardanoUriError);
        try {
            parse(invalidUri);
        } catch (err) {
            if (err instanceof CardanoUriError) {
                expect(err.type).toBe('MissingRequiredField');
            }
        }
    });

    test('safeParse() - returns null on missing faucet_url', () => {
        const result = safeParse(invalidUri);
        expect(result).toBeNull();
    });
});

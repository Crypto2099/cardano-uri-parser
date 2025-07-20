import { parse, safeParse, StakeUri, CardanoUriError } from '../src';
import { failIfNull } from './failIfNull';

describe('Stake URI', () => {
    const validUri = 'web+cardano://stake?pool1=1&pool2=2';
    const duplicateUri = 'web+cardano://stake?pool1=1&pool1=2';

    test('parse() - throws on stake URI with duplicate pool keys', () => {
        const badUri = 'web+cardano://stake?POOL1=1&POOL1=2';
        expect(() => parse(badUri)).toThrow(CardanoUriError);
    });

    test('parse() - parses multiple pools', () => {
        const result = failIfNull(parse(validUri), 'Stake URI parsing failed') as StakeUri;
        expect(result.pools['pool1']).toBe(1);
        expect(result.pools['pool2']).toBe(2);
    });

    test('safeParse() - parses multiple pools', () => {
        const result = failIfNull(safeParse(validUri), 'safeParse failed') as StakeUri;
        expect(result.pools['pool1']).toBe(1);
    });

    test('parse() - throws on duplicate pools', () => {
        expect(() => parse(duplicateUri)).toThrow(CardanoUriError);
    });

    test('safeParse() - returns null on duplicate pools', () => {
        const result = safeParse(duplicateUri);
        expect(result).toBeNull();
    });
});

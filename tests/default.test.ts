import { parse, safeParse } from '../src/cardano-uri-parser';
import { DefaultUri } from '../src/types';
import { failIfNull } from './failIfNull';
import { CardanoUriError } from '../src/errors';

describe('Default URI (basic payment)', () => {
    const shelleyMainnet = 'web+cardano://addr1qxyz?amount=42';
    const shelleyTestnet = 'web+cardano://addr_test1xyz?amount=10';
    const byronBootstrap = 'web+cardano://DdzFFxyz';
    const byronIcarus = 'web+cardano://Ae2tdxyz';
    const invalidAddress = 'web+cardano://invalid123';

    test('Shelley mainnet detection', () => {
        const result = failIfNull(parse(shelleyMainnet), 'Failed') as DefaultUri;
        expect(result.era).toBe('shelley');
        expect(result.network).toBe('mainnet');
    });

    test('Shelley testnet detection', () => {
        const result = failIfNull(parse(shelleyTestnet), 'Failed') as DefaultUri;
        expect(result.era).toBe('shelley');
        expect(result.network).toBe('testnet');
    });

    test('Byron bootstrap detection', () => {
        const result = failIfNull(parse(byronBootstrap), 'Failed') as DefaultUri;
        expect(result.era).toBe('byron');
        expect(result.network).toBe('mainnet');
    });

    test('Byron Icarus detection', () => {
        const result = failIfNull(parse(byronIcarus), 'Failed') as DefaultUri;
        expect(result.era).toBe('byron');
        expect(result.network).toBe('mainnet');
    });

    test('Throws on invalid address', () => {
        expect(() => parse(invalidAddress)).toThrow(CardanoUriError);
    });

    test('safeParse returns null on invalid address', () => {
        const result = safeParse(invalidAddress);
        expect(result).toBeNull();
    });
});

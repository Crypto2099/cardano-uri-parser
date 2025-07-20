import {parse, safeParse, CardanoUriError} from '../src';

describe('General', () => {
    test('returns null on non-Cardano URI', () => {
        expect(safeParse('https://example.com')).toBeNull();
    });

    test('throws on non-Cardano URI', () => {
        expect(() => parse('https://example.com')).toThrow(CardanoUriError);
    });

    test('throws on completely invalid URI', () => {
        expect(() => parse('not-a-uri')).toThrow(CardanoUriError);
    });

    test('returns null on completely invalid URI', () => {
        expect(safeParse('not-a-uri')).toBeNull();
    });
});
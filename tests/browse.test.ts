import {parse, safeParse, BrowseUri, CardanoUriError} from '../src';
import {failIfNull} from './failIfNull';

describe('Browse URI', () => {
    const validUri = 'web+cardano://browse/https/fi.sundae.app/exchange?param=val';
    const missingSchemeUri = 'web+cardano://browse//fi.sundae.app/exchange';
    const schemeOnlyUri = 'web+cardano://browse/https';
    const missingSchemeButHasDomain = 'web+cardano://browse//fi.sundae.app';
    const singleReversedDomainOnly = 'web+cardano://browse/fi.sundae.app';
    const invalidSchemeUri = 'web+cardano://browse/123invalid/fi.sundae.app';
    const invalidNamespaceUri = 'web+cardano://browse/https/myapp';

    test('parse() - browse URI without query params still returns correct URL', () => {
        const uri = 'web+cardano://browse/https/fi.sundae.app/exchange';
        const result = failIfNull(parse(uri), 'Browse URI parsing failed') as BrowseUri;
        expect(result.url).toBe('https://app.sundae.fi/exchange');
    });

    test('parse() - parses valid browse URI with reconstructed URL', () => {
        const result = failIfNull(parse(validUri), 'Browse URI parsing failed') as BrowseUri;
        expect(result.scheme).toBe('https');
        expect(result.namespaced_domain).toBe('fi.sundae.app');
        expect(result.app_path).toBe('exchange');
        expect(result.url).toBe('https://app.sundae.fi/exchange?param=val');
    });

    test('safeParse() - parses valid browse URI', () => {
        const result = failIfNull(safeParse(validUri), 'safeParse failed') as BrowseUri;
        expect(result.url).toBe('https://app.sundae.fi/exchange?param=val');
    });

    test('parse() - throws on missing scheme (double slash)', () => {
        expect(() => parse(missingSchemeUri)).toThrow(CardanoUriError);
    });

    test('safeParse() - returns null on missing scheme (double slash)', () => {
        const result = safeParse(missingSchemeUri);
        expect(result).toBeNull();
    });

    test('parse() - throws on scheme only', () => {
        expect(() => parse(schemeOnlyUri)).toThrow(CardanoUriError);
    });

    test('safeParse() - returns null on scheme only', () => {
        const result = safeParse(schemeOnlyUri);
        expect(result).toBeNull();
    });

    test('parse() - throws on missing scheme but has domain', () => {
        expect(() => parse(missingSchemeButHasDomain)).toThrow(CardanoUriError);
    });

    test('safeParse() - returns null on missing scheme but has domain', () => {
        const result = safeParse(missingSchemeButHasDomain);
        expect(result).toBeNull();
    });

    test('parse() - throws on single reversed domain without scheme', () => {
        expect(() => parse(singleReversedDomainOnly)).toThrow(CardanoUriError);
    });

    test('safeParse() - returns null on single reversed domain without scheme', () => {
        const result = safeParse(singleReversedDomainOnly);
        expect(result).toBeNull();
    });

    test('parse() - throws on invalid scheme format', () => {
        expect(() => parse(invalidSchemeUri)).toThrow(CardanoUriError);
    });

    test('parse() - throws on invalid namespaced domain format', () => {
        expect(() => parse(invalidNamespaceUri)).toThrow(CardanoUriError);
    });
});

import { parse, safeParse, CardanoUriError, TransactionUri } from '../src';
import { failIfNull } from './failIfNull';

describe('Transaction URI', () => {
    const validTxHash = '7704a68404facf7126fa356f1b09f0e4c552aeef454cd0daba4208f3a64372e9';

    test('parses transaction URI with hash', () => {
        const uri = `web+cardano://transaction/${validTxHash}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse tx URI') as TransactionUri;
        expect(result.type).toBe('transaction');
        expect(result.tx_hash).toBe(validTxHash);
    });

    test('parses transaction URI with fragment index', () => {
        const uri = `web+cardano://transaction/${validTxHash}#1`;
        const result = failIfNull(safeParse(uri), 'Failed to parse tx URI') as TransactionUri;
        expect(result.output_index).toBe(1);
    });

    test('parses transaction URI with metadata', () => {
        const uri = `web+cardano://transaction/${validTxHash}/metadata`;
        const result = failIfNull(safeParse(uri), 'Failed to parse tx URI') as TransactionUri;
        expect(result.metadata).toEqual({});
    });

    test('parses transaction URI with metadata label', () => {
        const uri = `web+cardano://transaction/${validTxHash}/metadata/674`;
        const result = failIfNull(safeParse(uri), 'Failed to parse tx URI') as TransactionUri;
        expect(result.metadata?.label).toBe('674');
    });

    test('parses self metadata URI', () => {
        const uri = 'web+cardano://transaction/self/metadata/1694';
        const result = failIfNull(safeParse(uri), 'Failed to parse tx URI') as TransactionUri;
        expect(result.tx_hash).toBe('self');
        expect(result.metadata?.label).toBe('1694');
    });

    test('throws if transaction hash is invalid', () => {
        const uri = 'web+cardano://transaction/notavalidhash';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if output index fragment is invalid', () => {
        const uri = `web+cardano://transaction/${validTxHash}#abc`;
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });
});

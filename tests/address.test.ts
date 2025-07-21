import { parse, safeParse, CardanoUriError, AddressUri } from "../src";
import { failIfNull } from './failIfNull';

describe('Address URI handler', () => {
    const mainnetPayment = 'addr1q93l79hdpvaeqnnmdkshmr4mpjvxnacqxs967keht465tt2dn0z9uhgereqgjsw33ka6c8tu5um7hqsnf5fd50fge9gq4lu2ql';
    const mainnetStake = 'stake1u9xeh3z7t5v3usyfg8gcmwavr472wdltsgf56yk6855vj5qvvx2vf';
    const testnetEnterprise = 'addr_test1vqg4jwm93g4l7f8c0an9v7ljafefr8q5x0l43lx0v3gdyuqztnrja';
    const byronDaedalus = 'DdzFFzCqrhsxK6ZtpKf6r17Zh6eAzGyeh1i9Sc72X7DjZKXGdp5Ba1DY4q1zfsPuBBP1DQP7rM2wPGb4EyLkgD1PZ6F2jcB4xgWYThjg';
    const byronIcarus = 'Ae2tdPwUPEZ6sE74qDJ6xL3MnLWVL5MtF6NcdX3mVJ6zHr5ZQ7mEKyVxgkP';

    test('parses mainnet payment address', () => {
        const uri = `web+cardano://address/${mainnetPayment}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse address URI') as AddressUri;
        expect(result.type).toBe('address');
        expect(result.address).toBe(mainnetPayment);
    });

    test('parses with stake reference', () => {
        const uri = `web+cardano://address/${mainnetPayment}?stake_reference=${mainnetStake}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse address URI with stake reference') as AddressUri;
        expect(result.stake_reference).toBe(mainnetStake);
    });

    test('parses testnet enterprise address', () => {
        const uri = `web+cardano://address/${testnetEnterprise}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse testnet enterprise address') as AddressUri;
        expect(result.address).toBe(testnetEnterprise);
    });

    test('parses Byron Daedalus address', () => {
        const uri = `web+cardano://address/${byronDaedalus}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse Byron Daedalus address') as AddressUri;
        expect(result.address).toBe(byronDaedalus);
    });

    test('parses Byron Icarus address', () => {
        const uri = `web+cardano://address/${byronIcarus}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse Byron Icarus address') as AddressUri;
        expect(result.address).toBe(byronIcarus);
    });

    test('throws if missing address', () => {
        const uri = 'web+cardano://address/';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if invalid address format', () => {
        const uri = 'web+cardano://address/notavalidaddress';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('safeParse returns null on invalid', () => {
        const uri = 'web+cardano://address/notavalidaddress';
        const result = safeParse(uri);
        expect(result).toBeNull();
    });
});

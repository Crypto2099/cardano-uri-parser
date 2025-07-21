import { parse, safeParse, CardanoUriError, AddressUri } from "../src";
import { failIfNull } from './failIfNull';

describe('Address URI handler', () => {
    const mainnetPayment = 'addr1q93l79hdpvaeqnnmdkshmr4mpjvxnacqxs967keht465tt2dn0z9uhgereqgjsw33ka6c8tu5um7hqsnf5fd50fge9gq4lu2ql';
    const mainnetStake = 'stake_test1u9xeh3z7t5v3usyfg8gcmwavr472wdltsgf56yk6855vj5qvvx2vf';
    const testnetEnterprise = 'addr_test1vqg4jwm93g4l7f8c0an9v7ljafefr8q5x0l43lx0v3gdyuqztnrja';
    const byronDaedalus = 'DdzFFzCqrhsxK6ZtpKf6r17Zh6eAzGyeh1i9Sc72X7DjZKXGdp5Ba1DY4q1zfsPuBBP1DQP7rM2wPGb4EyLkgD1PZ6F2jcB4xgWYThjg';
    const byronIcarus = 'Ae2tdPwUPEZ6sE74qDJ6xL3MnLWVL5MtF6NcdX3mVJ6zHr5ZQ7mEKyVxgkP';
    const drepVk = 'drep_vk17axh4sc9zwkpsft3tlgpjemfwc0u5mnld80r85zw7zdqcst6w54sdv4a4e';
    const drepHash = 'drep15k6929drl7xt0spvudgcxndryn4kmlzpk4meed0xhqe25nle07s';
    const ccColdVk = 'cc_cold_vk149up407pvp9p36lldlp4qckqqzn6vm7u5yerwy8d8rqalse3t04q7qsvwl';
    const ccColdHash = 'cc_cold1lmaet9hdvu9d9jvh34u0un4ndw3yewaq5ch6fnwsctw02xxwylj';
    const ccHotScript = 'cc_hot_script16fayy2wf9myfvxmtl5e2suuqmnhy5zx80vxkezen7xqwskncf40';

    test('parses mainnet payment address', () => {
        const uri = `web+cardano://addr/${mainnetPayment}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse address URI') as AddressUri;
        expect(result.type).toBe('address');
        expect(result.address).toBe(mainnetPayment);
    });

    test('parses testnet enterprise address', () => {
        const uri = `web+cardano://addr/${testnetEnterprise}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse testnet enterprise address') as AddressUri;
        expect(result.address).toBe(testnetEnterprise);
    });

    test('parses mainnet stake address', () => {
        const uri = `web+cardano://addr/${mainnetStake}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse address URI') as AddressUri;
        expect(result.type).toBe('address');
    })

    test('parses Byron Daedalus address', () => {
        const uri = `web+cardano://addr/${byronDaedalus}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse Byron Daedalus address') as AddressUri;
        expect(result.address).toBe(byronDaedalus);
    });

    test('parses Byron Icarus address', () => {
        const uri = `web+cardano://addr/${byronIcarus}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse Byron Icarus address') as AddressUri;
        expect(result.address).toBe(byronIcarus);
    });

    test('parses DRep vkey', () => {
        const uri = `web+cardano://addr/${drepVk}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse DRep vkey') as AddressUri;
        expect(result.address).toBe(drepVk);
    });

    test('parses DRep hash', () => {
        const uri = `web+cardano://addr/${drepHash}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse DRep hash') as AddressUri;
        expect(result.address).toBe(drepHash);
    });

    test('parses CC Cold vkey', () => {
        const uri = `web+cardano://addr/${ccColdVk}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse CC Cold vkey') as AddressUri;
        expect(result.address).toBe(ccColdVk);
    });

    test('parses CC Cold hash', () => {
        const uri = `web+cardano://addr/${ccColdHash}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse CC Cold hash') as AddressUri;
        expect(result.address).toBe(ccColdHash);
    });

    test('parses CC Hot script', () => {
        const uri = `web+cardano://addr/${ccHotScript}`;
        const result = failIfNull(safeParse(uri), 'Failed to parse CC Hot script') as AddressUri;
        expect(result.address).toBe(ccHotScript);
    });

    test('throws if missing address', () => {
        const uri = 'web+cardano://addr/';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('throws if invalid address format', () => {
        const uri = 'web+cardano://addr/notavalidaddress';
        expect(() => parse(uri)).toThrow(CardanoUriError);
    });

    test('safeParse returns null on invalid', () => {
        const uri = 'web+cardano://addr/notavalidaddress';
        const result = safeParse(uri);
        expect(result).toBeNull();
    });
});

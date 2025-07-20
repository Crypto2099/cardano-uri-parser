import {DefaultUri} from '../types';
import {CardanoUriError} from '../errors';

export function handleDefaultUri(address: string, queryParams: URLSearchParams): DefaultUri {
    if (!address) {
        throw new CardanoUriError('MissingRequiredField', 'Missing address');
    }

    let era: 'byron' | 'shelley';
    let network: 'mainnet' | 'testnet';

    if (address.startsWith('addr1')) {
        era = 'shelley';
        network = 'mainnet';
    } else if (address.startsWith('addr_test1')) {
        era = 'shelley';
        network = 'testnet';
    } else if (/^DdzFF/.test(address) || /^Ae2td/.test(address)) {
        era = 'byron';
        network = 'mainnet'; // Byron testnet is rare, assuming mainnet
    } else {
        throw new CardanoUriError('InvalidAddress', 'Provided address is not recognized as valid Cardano address');
    }

    const amountStr = queryParams.get('amount');
    const amount = amountStr ? Number(amountStr) : undefined;

    return {
        type: 'payment',
        address,
        amount,
        era,
        network
    };
}

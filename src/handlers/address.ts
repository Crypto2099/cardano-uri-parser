import { AddressUri } from '../types';
import { CardanoUriError } from '../errors';
import { isValidCardanoAddress } from '../utils/validators';

export function handleAddressUri(
    pathParts: string[],
    queryParams: URLSearchParams
): AddressUri {
    const [address] = pathParts;

    if (!address) {
        throw new CardanoUriError('MissingRequiredField', 'Missing address');
    }

    if (!isValidCardanoAddress(address)) {
        throw new CardanoUriError('InvalidFormat', 'Invalid Cardano address format');
    }

    const stake_reference = queryParams.get('stake_reference');

    return {
        type: 'address',
        address,
        stake_reference: stake_reference || undefined
    };
}

import { BlockUri } from '../types';
import { CardanoUriError } from '../errors';
import { isValidHex64, isValidBlockHeight } from '../utils/validators';

export function handleBlockUri(
    rest: string[],
    queryParams: URLSearchParams
): BlockUri {
    const hash = queryParams.get('hash');
    const height = queryParams.get('height');

    if (!hash && !height) {
        throw new CardanoUriError('MissingRequiredField', 'Block URI must have either hash or height');
    }

    if (hash && height) {
        throw new CardanoUriError('InvalidCombination', 'Cannot provide both block hash and height');
    }

    if (hash && !isValidHex64(hash)) {
        throw new CardanoUriError('InvalidFormat', 'Invalid block hash format');
    }

    if (height && !isValidBlockHeight(height)) {
        throw new CardanoUriError('InvalidFormat', 'Invalid block height format');
    }

    return {
        type: 'block',
        block_hash: hash || undefined,
        block_height: height ? Number(height) : undefined
    };
}

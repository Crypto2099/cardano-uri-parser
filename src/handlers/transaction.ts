import { TransactionUri } from '../types';
import { CardanoUriError } from '../errors';
import { isValidHex64, isValidMetadataLabel } from '../utils/validators';

export function handleTransactionUri(
    pathParts: string[],
    fragment: string | null
): TransactionUri {
    const [tx_hash, ...subpaths] = pathParts;

    if (!tx_hash) {
        throw new CardanoUriError('MissingRequiredField', 'Missing transaction hash');
    }

    if (tx_hash !== 'self' && !isValidHex64(tx_hash)) {
        throw new CardanoUriError('InvalidFormat', 'Invalid transaction hash format');
    }

    let metadata: TransactionUri['metadata'] = undefined;

    if (subpaths[0] === 'metadata') {
        if (subpaths[1] && !isValidMetadataLabel(subpaths[1])) {
            throw new CardanoUriError('InvalidFormat', 'Invalid metadata label format');
        }
        metadata = subpaths[1] ? { label: subpaths[1] } : {};
    }

    const result: TransactionUri = {
        type: 'transaction',
        tx_hash,
        metadata
    };

    if (fragment !== null) {
        const index = Number(fragment);
        if (!Number.isInteger(index) || index < 0) {
            throw new CardanoUriError('InvalidFormat', 'Invalid output index fragment');
        }
        result.output_index = index;
    }

    return result;
}

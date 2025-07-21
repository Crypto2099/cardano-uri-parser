import { PayUri } from '../types';
import { CardanoUriError } from '../errors';
import { classifyCardanoAddress } from '../utils/validators';

export function handlePayUri(rest: string[], queryParams: URLSearchParams): PayUri {
    const address = rest[0];
    if (!address) {
        throw new CardanoUriError('MissingRequiredField', 'Missing address in pay URI');
    }

    const { valid } = classifyCardanoAddress(address);
    if (!valid) {
        throw new CardanoUriError('InvalidAddress', 'Invalid Cardano address format');
    }

    const result: PayUri = {
        type: 'pay',
        address,
    };

    if (queryParams.has('l')) {
        const lovelace = Number(queryParams.get('l'));
        if (!Number.isInteger(lovelace) || lovelace < 0) {
            throw new CardanoUriError('InvalidLovelace', 'Invalid lovelace amount');
        }
        result.lovelace = lovelace;
    }

    if (queryParams.has('i')) {
        result.paymentId = queryParams.get('i')!;
    }

    if (queryParams.has('n')) {
        result.note = decodeURIComponent(queryParams.get('n')!);
    }

    if (queryParams.has('t')) {
        const tokensStr = queryParams.get('t')!;
        const tokens = tokensStr.split(',').map((pair) => {
            const [assetId, qtyStr] = pair.split('|');
            if (!assetId.startsWith('asset1') || assetId.length !== 45) {
                throw new CardanoUriError('InvalidToken', `Invalid asset ID: ${assetId}`);
            }
            const quantity = Number(qtyStr);
            if (!Number.isInteger(quantity) || quantity < 0) {
                throw new CardanoUriError('InvalidTokenQuantity', `Invalid quantity for asset: ${assetId}`);
            }
            return { assetId, quantity };
        });
        result.tokens = tokens;
    }

    return result;
}

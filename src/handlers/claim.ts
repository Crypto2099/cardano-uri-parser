import { ClaimUri } from '../types';
import { CardanoUriError } from '../errors';

export function handleClaimUri(rest: string[], queryParams: URLSearchParams): ClaimUri {
    const versionStr = rest[0]?.replace('v', '');
    const version = Number(versionStr);

    if (!versionStr || isNaN(version)) {
        throw new CardanoUriError('MissingRequiredField', 'Missing or invalid version in claim URI');
    }

    const faucetUrl = queryParams.get('faucet_url');
    if (!faucetUrl) {
        throw new CardanoUriError('MissingRequiredField', 'faucet_url is required in claim URI');
    }

    return {
        type: 'claim',
        version,
        faucet_url: faucetUrl,
        code: queryParams.get('code')
    };
}

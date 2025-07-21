import { StakeUri } from '../types';
import { CardanoUriError } from '../errors';

export function handleStakeUri(_rest: string[], queryParams: URLSearchParams): StakeUri {
    const pools: { [pool_id: string]: number } = {};
    queryParams.forEach((value, key) => {
        if (pools[key] !== undefined) {
            throw new CardanoUriError('HandlerError', `Duplicate pool key: ${key}`);
        }
        pools[key] = Number(value) || 1;
    });
    return {
        type: 'stake',
        pools
    };
}

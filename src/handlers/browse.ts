import { BrowseUri } from '../types';
import { CardanoUriError } from '../errors';

export function handleBrowseUri(rest: string[], queryParams: URLSearchParams): BrowseUri {
    if (rest.length < 2) {
        throw new CardanoUriError('MissingRequiredField', 'Expected at least scheme and namespaced domain');
    }

    const scheme = rest[0];
    const namespacedDomain = rest[1];

    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*$/.test(scheme)) {
        throw new CardanoUriError('InvalidScheme', 'Invalid scheme format: ' + scheme);
    }

    if (!namespacedDomain.includes('.')) {
        throw new CardanoUriError('InvalidNamespace', 'Invalid namespaced domain format: ' + namespacedDomain);
    }

    const appPath = rest.slice(2).join('/');

    const qp: Record<string, string> = {};
    queryParams.forEach((value, key) => {
        qp[key] = value;
    });

    const reversedDomain = namespacedDomain.split('.').reverse().join('.');
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const fullUrl = `${scheme}://${reversedDomain}/${appPath}${queryString}`;

    return {
        type: 'browse',
        scheme,
        namespaced_domain: namespacedDomain,
        app_path: appPath,
        queryParams: qp,
        url: fullUrl
    };
}

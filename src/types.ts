export interface ClaimUri {
    type: 'claim';
    version: number;
    faucet_url: string;
    code?: string | null;
}

export interface StakeUri {
    type: 'stake';
    pools: { [pool_id: string]: number };
}

export interface BrowseUri {
    type: 'browse';
    scheme: string;
    namespaced_domain: string;
    app_path: string;
    queryParams: Record<string, string>;
    url: string;
}

export interface DefaultUri {
    type: 'payment';
    address: string;
    amount?: number;
    era: 'byron' | 'shelley';
    network: 'mainnet' | 'testnet';
}


export type CardanoUri =
    | ClaimUri
    | StakeUri
    | BrowseUri
    | DefaultUri;

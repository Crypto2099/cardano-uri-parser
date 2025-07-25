export interface ClaimUri {
    type: "claim";
    version: number;
    faucet_url: string;
    code?: string | null;
}

export interface StakeUri {
    type: "stake";
    pools: { [pool_id: string]: number };
}

export interface BrowseUri {
    type: "browse";
    scheme: string;
    namespaced_domain: string;
    app_path: string;
    queryParams: Record<string, string>;
    url: string;
}

export type BlockUri = {
    type: "block",
    block_hash?: string,
    block_height?: number
}

export type TransactionUri = {
    type: "transaction",
    tx_hash: string | "self",
    output_index?: number,
    metadata?: {
        label?: string
    }
}

export interface AddressUri {
    type: 'address';
    address: string;
    address_type?: string;
    is_testnet?: boolean;
}

export interface PayUri {
    type: 'pay';
    address: string;
    lovelace?: number;
    paymentId?: string;
    note?: string;
    tokens?: { assetId: string; quantity: number }[];
}

export interface DefaultUri {
    type: "payment";
    address: string;
    amount?: number;
    era: "byron" | "shelley";
    network: "mainnet" | "testnet";
}

export type CardanoUri =
    | AddressUri
    | BrowseUri
    | BlockUri
    | ClaimUri
    | PayUri
    | StakeUri
    | TransactionUri
    | DefaultUri;

import {BlockUri} from "../types";
import {CardanoUriError} from "../errors";

export function handleBlockUri(queryParams: URLSearchParams): BlockUri {
    const hash = queryParams.get("hash");
    const height = queryParams.get("height");

    if (!hash && !height) {
        throw new CardanoUriError("MissingRequiredField", "Block URI must have either hash or height");
    }

    if (hash && !/^[0-9a-fA-F]{64}$/.test(hash)) {
        throw new CardanoUriError("InvalidFormat", "Invalid block hash format");
    }

    if (height && isNaN(Number(height))) {
        throw new CardanoUriError("InvalidFormat", "Invalid block height format");
    }

    return {
        type: "block",
        block_hash: hash || undefined,
        block_height: height ? Number(height) : undefined
    };
}

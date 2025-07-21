import {TransactionUri} from "../types";
import {CardanoUriError} from "../errors";

export function handleTransactionUri(
    pathParts: string[],
    fragment: string | null
): TransactionUri {
    const [tx_hash, ...subpaths] = pathParts;

    if (!tx_hash) {
        throw new CardanoUriError("MissingRequiredField", "Missing transaction hash");
    }

    if (tx_hash !== "self" && !/^[0-9a-fA-F]{64}$/.test(tx_hash)) {
        throw new CardanoUriError("InvalidFormat", "Invalid transaction hash format");
    }

    let metadata: TransactionUri["metadata"] = undefined;

    if (subpaths[0] === "metadata") {
        metadata = subpaths[1] ? {label: subpaths[1]} : {};
    }

    const result: TransactionUri = {
        type: "transaction",
        tx_hash,
        metadata
    };

    if (fragment !== null) {
        const index = Number(fragment);
        if (!Number.isInteger(index)) {
            throw new CardanoUriError("InvalidFormat", "Invalid output index fragment");
        }
        result.output_index = index;
    }

    return result;
}
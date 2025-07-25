import {handleAddrUri} from "./handlers/addr";
import {handleBlockUri} from "./handlers/block";
import {handleBrowseUri} from "./handlers/browse";
import {handleClaimUri} from "./handlers/claim";
import {handlePayUri} from "./handlers/pay";
import {handleStakeUri} from "./handlers/stake";
import {handleTransactionUri} from "./handlers/transaction";
import {handleDefaultUri} from "./handlers/default";
import {CardanoUri} from "./types";
import {CardanoUriError} from "./errors";

export function parse(uri: string): CardanoUri {
    let url: URL;

    try {
        url = new URL(uri);
    } catch {
        throw new CardanoUriError("InvalidUri", "Invalid URI format");
    }

    if (url.protocol !== "web+cardano:") {
        throw new CardanoUriError("InvalidScheme", "Unsupported scheme: " + url.protocol);
    }

    const authority = url.hostname;
    const pathParts = url.pathname.split("/").filter(Boolean);
    const queryParams = url.searchParams;

    try {
        switch (authority) {
            case "addr":
                return handleAddrUri(pathParts);
            case "block":
                return handleBlockUri(pathParts, queryParams);
            case "browse":
                return handleBrowseUri(pathParts, queryParams);
            case "claim":
                return handleClaimUri(pathParts, queryParams);
            case "pay":
                return handlePayUri(pathParts, queryParams);
            case "stake":
                return handleStakeUri(pathParts, queryParams);
            case "transaction":
                return handleTransactionUri(pathParts, url.hash ? url.hash.slice(1) : null);
            default:
                return handleDefaultUri(authority, queryParams);
        }
    } catch (err) {
        if (err instanceof CardanoUriError) {
            throw err;
        }
        throw new CardanoUriError("HandlerError", "Error in handler", {originalError: err});
    }
}

export function safeParse(uri: string): CardanoUri | null {
    try {
        return parse(uri);
    } catch {
        return null;
    }
}

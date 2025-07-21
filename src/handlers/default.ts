import {DefaultUri} from "../types";
import {CardanoUriError} from "../errors";
import {classifyCardanoAddress} from "../utils/validators";

export function handleDefaultUri(address: string, queryParams: URLSearchParams): DefaultUri {
    const {valid, type, is_testnet} = classifyCardanoAddress(address);

    if (!valid || !type) {
        throw new CardanoUriError("InvalidAddress", "Provided address is not recognized as valid Cardano address");
    }

    const amountStr = queryParams.get("amount");
    const amount = amountStr ? Number(amountStr) : undefined;
    const era = type.startsWith("byron") ? "byron" : "shelley";
    const network = is_testnet ? "testnet" : "mainnet";

    return {
        type: "payment",
        address,
        amount,
        era,
        network
    };
}

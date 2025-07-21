import {AddressUri} from "../types";
import {CardanoUriError} from "../errors";
import {classifyCardanoAddress} from "../utils/validators";

export function handleAddrUri(rest: string[]): AddressUri {
    const address = rest[0];
    if (!address) {
        throw new CardanoUriError("MissingRequiredField", "Missing address");
    }

    const { valid, type, is_testnet } = classifyCardanoAddress(address);

    if (!valid) {
        throw new CardanoUriError('InvalidAddress', 'Invalid Cardano address format');
    }

    return {
        type: 'address',
        address,
        address_type: type,
        is_testnet,
    };
}

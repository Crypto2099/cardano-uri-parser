export function isValidHex64(value: string): boolean {
    return /^[0-9a-fA-F]{64}$/.test(value);
}

export function isValidBlockHeight(value: string): boolean {
    return /^[0-9]+$/.test(value) && Number(value) >= 0;
}

export function isValidMetadataLabel(value: string): boolean {
    return /^[0-9]+$/.test(value);
}

// This is a very rudimentary address check to ensure that they are at least the right lengths
export function isValidCardanoAddress(value: string): boolean {
    const base58Prefixes = ['DdzFF', 'Ae2'];

    if (value.startsWith('stake1')) {
        // Shelley reward / stake address (mainnet + testnet)
        return value.length === 59;
    }

    if (value.startsWith('addr1')) {
        // Mainnet enterprise (58) or payment/pointer (103)
        return value.length === 58 || value.length === 103;
    }

    if (value.startsWith('addr_test1')) {
        // Testnet enterprise (63) or payment/pointer (108)
        return value.length === 63 || value.length === 108;
    }

    if (base58Prefixes.some(prefix => value.startsWith(prefix))) {
        if (value.startsWith('Ae2')) {
            // Icarus Byron addresses
            return value.length >= 59 && value.length <= 64;
        }

        if (value.startsWith('DdzFF')) {
            // Daedalus Byron addresses
            return value.length >= 104 && value.length <= 128;
        }
    }

    return false;
}
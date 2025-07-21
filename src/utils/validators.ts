export function isValidHex64(value: string): boolean {
    return /^[0-9a-fA-F]{64}$/.test(value);
}

export function isValidBlockHeight(value: string): boolean {
    return /^[0-9]+$/.test(value) && Number(value) >= 0;
}

export function isValidMetadataLabel(value: string): boolean {
    return /^[0-9]+$/.test(value);
}

export function classifyCardanoAddress(value: string): { valid: boolean; type?: string; is_testnet?: boolean } {
    const is_testnet = value.includes("_test");

    if (value.startsWith("stake1") || value.startsWith("stake_test1")) {
        return {valid: value.length === 59 || value.length === 64, type: "stake", is_testnet};
    }

    if (value.startsWith("addr1")) {
        return {valid: value.length === 103 || value.length === 58, type: "shelley", is_testnet};
    }

    if (value.startsWith("addr_test1")) {
        return {valid: value.length === 108 || value.length === 63, type: "shelley", is_testnet};
    }

    if (value.startsWith("Ae2")) {
        return {valid: value.length >= 59 && value.length <= 64, type: "byron_icarus", is_testnet};
    }

    if (value.startsWith("DdzFF")) {
        return {valid: value.length >= 104 && value.length <= 128, type: "byron_daedalus", is_testnet};
    }

    const cip105Prefixes = [
        "drep_vk", "drep_script", "drep",
        "cc_cold_vk", "cc_cold_script", "cc_cold",
        "cc_hot_vk", "cc_hot_script", "cc_hot",
    ];

    for (const prefix of cip105Prefixes) {
        if (value.startsWith(prefix)) {
            return {valid: true, type: prefix, is_testnet};
        }
    }

    return {valid: false};
}
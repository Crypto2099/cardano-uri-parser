export function isValidHex64(value: string): boolean {
    return /^[0-9a-fA-F]{64}$/.test(value);
}

export function isValidBlockHeight(value: string): boolean {
    return /^[0-9]+$/.test(value) && Number(value) >= 0;
}

export function isValidMetadataLabel(value: string): boolean {
    return /^[0-9]+$/.test(value);
}
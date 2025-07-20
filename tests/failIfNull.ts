export function failIfNull<T>(result: T | null, message: string): T {
    if (!result) throw new Error(message);
    return result;
}
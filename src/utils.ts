export function isSuccessStatusCode(status: number): boolean {
    return status >= 200 && status <= 299;
}
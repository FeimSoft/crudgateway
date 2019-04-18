import { isSuccessStatusCode } from "../utils";

test('Check success status', () => {
    // Success
    for(let i = 200; i < 300; i++){
        expect(isSuccessStatusCode(i)).toBe(true);
    }

    // Client errors
    for(let i = 400; i < 500; i++){
        expect(isSuccessStatusCode(i)).toBe(false);
    }

    // Server errors
    for(let i = 500; i < 600; i++){
        expect(isSuccessStatusCode(i)).toBe(false);
    }
});
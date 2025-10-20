// backend/algorithms/caesarCipher.js

// Encrypt function
export function encrypt(text, shift) {
    if (typeof text !== 'string' || typeof shift !== 'number') {
        throw new Error('Invalid input');
    }

    shift = shift % 26; // Handle large shifts
    let result = '';

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'A' && char <= 'Z') {
            // Uppercase letters
            result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        } else if (char >= 'a' && char <= 'z') {
            // Lowercase letters
            result += String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        } else {
            // Non-alphabetic characters remain unchanged
            result += char;
        }
    }

    return result;
}

// Decrypt function
export function decrypt(text, shift) {
    // Decryption is just encryption with negative shift
    return encrypt(text, (26 - (shift % 26)) % 26);
}

// backend/algorithms/vigenereCipher.js

// Generate a cyclic key matching the length of the text
export function generateKey(text, key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    text = text.toUpperCase().replace(/[^A-Z]/g, '');

    let fullKey = '';
    for (let i = 0; i < text.length; i++) {
        fullKey += key[i % key.length];
    }

    return fullKey;
}

// Encrypt text using Vigenère Cipher
export function encrypt(text, key) {
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    const fullKey = generateKey(text, key);

    let cipherText = '';
    for (let i = 0; i < text.length; i++) {
        const x = (text.charCodeAt(i) - 65 + fullKey.charCodeAt(i) - 65) % 26;
        cipherText += String.fromCharCode(x + 65);
    }

    return cipherText;
}

// Decrypt text using Vigenère Cipher
export function decrypt(cipherText, key) {
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    const fullKey = generateKey(cipherText, key);

    let origText = '';
    for (let i = 0; i < cipherText.length; i++) {
        const x = (cipherText.charCodeAt(i) - 65 - (fullKey.charCodeAt(i) - 65) + 26) % 26;
        origText += String.fromCharCode(x + 65);
    }

    return origText;
}

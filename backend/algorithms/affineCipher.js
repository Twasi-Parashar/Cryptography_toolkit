// backend/algorithms/affineCipher.js

// Function to find modular multiplicative inverse of 'a' under modulo 'm'
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return null; // No inverse exists if gcd(a, m) ≠ 1
}

// Function to check if 'a' and 'm' are coprime
function isCoprime(a, m) {
    function gcd(x, y) {
        return y === 0 ? x : gcd(y, x % y);
    }
    return gcd(a, m) === 1;
}

// Encrypt function
function encrypt(text, a, b) {
    const m = 26; // Alphabet length
    if (!isCoprime(a, m)) {
        throw new Error(`Invalid key 'a' = ${a}. It must be coprime with 26.`);
    }

    let result = "";
    for (let char of text) {
        if (/[A-Za-z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 65 : 97;
            const x = char.charCodeAt(0) - base;
            const encrypted = (a * x + b) % m;
            result += String.fromCharCode(encrypted + base);
        } else {
            result += char; // Keep numbers, spaces, symbols unchanged
        }
    }
    return result;
}

// Decrypt function
function decrypt(cipher, a, b) {
    const m = 26;
    const a_inv = modInverse(a, m);
    if (a_inv === null) {
        throw new Error(`No modular inverse exists for a = ${a} under mod 26.`);
    }

    let result = "";
    for (let char of cipher) {
        if (/[A-Za-z]/.test(char)) {
            const isUpper = char === char.toUpperCase();
            const base = isUpper ? 65 : 97;
            const y = char.charCodeAt(0) - base;
            // Fixed formula: a_inv * (y - b) mod m
            let decrypted = (a_inv * (y - b)) % m;
            if (decrypted < 0) decrypted += m; // Handle negative results
            result += String.fromCharCode(decrypted + base);
        } else {
            result += char;
        }
    }
    return result;
}

// Unified function (optional, not needed for separate endpoints)
function affineCipher(text, a, b, mode) {
    if (mode === "encrypt") return encrypt(text, a, b);
    if (mode === "decrypt") return decrypt(text, a, b);
    throw new Error("Mode must be 'encrypt' or 'decrypt'.");
}

// ✅ Export named functions
export { encrypt, decrypt, affineCipher };
// Check if a and 26 are coprime
const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

// Find modular inverse of a modulo 26
const modInverse = (a, m = 26) => {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    throw new Error('No modular inverse exists for this "a"');
};

export const encrypt = (text, a, b) => {
    if (gcd(a, 26) !== 1) throw new Error('"a" must be coprime with 26');
    return text
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);

            // Handle uppercase letters (A-Z)
            if (code >= 65 && code <= 90) {
                const x = code - 65;
                const encrypted = (a * x + b) % 26;
                return String.fromCharCode(encrypted + 65);
            }
            // Handle lowercase letters (a-z)
            else if (code >= 97 && code <= 122) {
                const x = code - 97;
                const encrypted = (a * x + b) % 26;
                return String.fromCharCode(encrypted + 97);
            }
            // Return non-alphabet characters unchanged
            return char;
        })
        .join('');
};

export const decrypt = (text, a, b) => {
    const aInv = modInverse(a);
    return text
        .split('')
        .map(char => {
            const code = char.charCodeAt(0);

            // Handle uppercase letters (A-Z)
            if (code >= 65 && code <= 90) {
                const y = code - 65;
                const decrypted = (aInv * (y - b + 26)) % 26;
                return String.fromCharCode(decrypted + 65);
            }
            // Handle lowercase letters (a-z)
            else if (code >= 97 && code <= 122) {
                const y = code - 97;
                const decrypted = (aInv * (y - b + 26)) % 26;
                return String.fromCharCode(decrypted + 97);
            }
            // Return non-alphabet characters unchanged
            return char;
        })
        .join('');
};
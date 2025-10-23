// backend/algorithms/playfairCipher.js

// Convert to lowercase and remove spaces
function preprocess(str) {
    return str.toLowerCase().replace(/\s/g, '').replace(/j/g, 'i');
}

// Generate 5x5 key table
function generateKeyTable(key) {
    key = preprocess(key);
    let keyT = Array.from({ length: 5 }, () => Array(5));
    let hash = Array(26).fill(0);

    for (let ch of key) {
        if (ch !== 'j') hash[ch.charCodeAt(0) - 97] = 2;
    }
    hash['j'.charCodeAt(0) - 97] = 1;

    let i = 0, j = 0;
    for (let k = 0; k < key.length; k++) {
        if (hash[key.charCodeAt(k) - 97] === 2) {
            hash[key.charCodeAt(k) - 97]--;
            keyT[i][j++] = key[k];
            if (j === 5) { i++; j = 0; }
        }
    }

    for (let k = 0; k < 26; k++) {
        if (hash[k] === 0) {
            keyT[i][j++] = String.fromCharCode(k + 97);
            if (j === 5) { i++; j = 0; }
        }
    }
    return keyT;
}

// Find position of letters in key table
function search(keyT, a, b, arr) {
    if (a === 'j') a = 'i';
    if (b === 'j') b = 'i';
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (keyT[i][j] === a) { arr[0] = i; arr[1] = j; }
            else if (keyT[i][j] === b) { arr[2] = i; arr[3] = j; }
        }
    }
}

// Prepare plaintext (ensure even length)
function prepareText(str) {
    if (str.length % 2 !== 0) str += 'z';
    return str;
}

// Encrypt text
function encryptText(str, keyT) {
    let arr = Array(4);
    let result = str.split('');
    for (let i = 0; i < str.length; i += 2) {
        search(keyT, result[i], result[i + 1], arr);
        if (arr[0] === arr[2]) {
            result[i] = keyT[arr[0]][(arr[1] + 1) % 5];
            result[i + 1] = keyT[arr[0]][(arr[3] + 1) % 5];
        } else if (arr[1] === arr[3]) {
            result[i] = keyT[(arr[0] + 1) % 5][arr[1]];
            result[i + 1] = keyT[(arr[2] + 1) % 5][arr[1]];
        } else {
            result[i] = keyT[arr[0]][arr[3]];
            result[i + 1] = keyT[arr[2]][arr[1]];
        }
    }
    return result.join('');
}

// Decrypt text
function decryptText(str, keyT) {
    let arr = Array(4);
    let result = str.split('');
    for (let i = 0; i < str.length; i += 2) {
        search(keyT, result[i], result[i + 1], arr);
        if (arr[0] === arr[2]) {
            result[i] = keyT[arr[0]][(arr[1] - 1 + 5) % 5];
            result[i + 1] = keyT[arr[0]][(arr[3] - 1 + 5) % 5];
        } else if (arr[1] === arr[3]) {
            result[i] = keyT[(arr[0] - 1 + 5) % 5][arr[1]];
            result[i + 1] = keyT[(arr[2] - 1 + 5) % 5][arr[1]];
        } else {
            result[i] = keyT[arr[0]][arr[3]];
            result[i + 1] = keyT[arr[2]][arr[1]];
        }
    }
    return result.join('');
}

// Export functions for backend use
export function encrypt(text, key) {
    text = prepareText(preprocess(text));
    const keyT = generateKeyTable(key);
    return encryptText(text, keyT);
}

export function decrypt(cipher, key) {
    cipher = preprocess(cipher);
    const keyT = generateKeyTable(key);
    return decryptText(cipher, keyT);
}

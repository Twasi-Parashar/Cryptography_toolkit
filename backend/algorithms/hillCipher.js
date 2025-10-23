// backend/algorithms/hillCipher.js

// Helper: Convert key string into a 3x3 key matrix
function getKeyMatrix(key) {
    if (key.length < 9) {
        throw new Error("Key must be at least 9 characters long");
    }

    let keyMatrix = new Array(3).fill(0).map(() => new Array(3).fill(0));
    let k = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            keyMatrix[i][j] = key[k].toUpperCase().charCodeAt(0) % 65;
            k++;
        }
    }
    return keyMatrix;
}

// Helper: Multiply matrices for encryption
function encryptBlock(messageVector, keyMatrix) {
    const cipherMatrix = new Array(3).fill(0).map(() => new Array(1).fill(0));

    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            cipherMatrix[i][0] += keyMatrix[i][x] * messageVector[x][0];
        }
        cipherMatrix[i][0] = cipherMatrix[i][0] % 26;
    }

    return cipherMatrix;
}

// Encrypt function
export function encrypt(text, key) {
    text = text.toUpperCase().replace(/[^A-Z]/g, ""); // remove spaces/non-letters
    const keyMatrix = getKeyMatrix(key.toUpperCase());

    // pad text to multiple of 3
    while (text.length % 3 !== 0) {
        text += "X";
    }

    let cipherText = "";

    for (let i = 0; i < text.length; i += 3) {
        const block = text.slice(i, i + 3);
        const messageVector = new Array(3).fill(0).map((_, idx) => [block[idx].charCodeAt(0) % 65]);
        const cipherMatrix = encryptBlock(messageVector, keyMatrix);

        for (let j = 0; j < 3; j++) {
            cipherText += String.fromCharCode(cipherMatrix[j][0] + 65);
        }
    }

    return cipherText;
}

// Decrypt function (basic version using modular inverse)
export function decrypt(cipherText, key) {
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, "");

    // Only support 3x3 keys
    const keyMatrix = getKeyMatrix(key.toUpperCase());

    // Calculate determinant
    const det =
        keyMatrix[0][0] * (keyMatrix[1][1] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][1]) -
        keyMatrix[0][1] * (keyMatrix[1][0] * keyMatrix[2][2] - keyMatrix[1][2] * keyMatrix[2][0]) +
        keyMatrix[0][2] * (keyMatrix[1][0] * keyMatrix[2][1] - keyMatrix[1][1] * keyMatrix[2][0]);

    const detMod = ((det % 26) + 26) % 26;
    const invDet = modInverse(detMod, 26);

    if (invDet === -1) {
        throw new Error("Key matrix is not invertible. Choose another key.");
    }

    // Adjugate matrix
    const adj = adjugate(keyMatrix);

    // Inverse key matrix = invDet * adj mod 26
    const invKeyMatrix = adj.map(row => row.map(val => ((val * invDet) % 26 + 26) % 26));

    let plainText = "";

    for (let i = 0; i < cipherText.length; i += 3) {
        const block = cipherText.slice(i, i + 3);
        const cipherVector = new Array(3).fill(0).map((_, idx) => [block[idx].charCodeAt(0) % 65]);
        const messageVector = encryptBlock(cipherVector, invKeyMatrix);

        for (let j = 0; j < 3; j++) {
            plainText += String.fromCharCode(messageVector[j][0] + 65);
        }
    }

    return plainText;
}

// Helper: Modular inverse function
function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) return x;
    }
    return -1;
}

// Helper: Adjugate of a 3x3 matrix
function adjugate(m) {
    const adj = new Array(3).fill(0).map(() => new Array(3).fill(0));

    adj[0][0] = (m[1][1] * m[2][2] - m[1][2] * m[2][1]);
    adj[0][1] = -(m[0][1] * m[2][2] - m[0][2] * m[2][1]);
    adj[0][2] = (m[0][1] * m[1][2] - m[0][2] * m[1][1]);

    adj[1][0] = -(m[1][0] * m[2][2] - m[1][2] * m[2][0]);
    adj[1][1] = (m[0][0] * m[2][2] - m[0][2] * m[2][0]);
    adj[1][2] = -(m[0][0] * m[1][2] - m[0][2] * m[1][0]);

    adj[2][0] = (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
    adj[2][1] = -(m[0][0] * m[2][1] - m[0][1] * m[2][0]);
    adj[2][2] = (m[0][0] * m[1][1] - m[0][1] * m[1][0]);

    // Transpose the cofactor matrix
    return adj[0].map((_, i) => adj.map(row => row[i]));
}

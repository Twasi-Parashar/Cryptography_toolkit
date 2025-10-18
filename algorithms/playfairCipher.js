// backend/algorithms/playfairCipher.js

// 🔹 Generate 5x5 Playfair matrix
const generateMatrix = (key) => {
    key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let seen = new Set();
    let matrix = [];

    // Add key characters first
    for (let char of key) {
        if (!seen.has(char)) {
            matrix.push(char);
            seen.add(char);
        }
    }

    // Add remaining alphabet (excluding J, since we replaced it with I)
    for (let char of "ABCDEFGHIKLMNOPQRSTUVWXYZ") {
        if (!seen.has(char)) {
            matrix.push(char);
            seen.add(char);
        }
    }

    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5));
};

// 🔹 Find character position in matrix
const findPosition = (matrix, char) => {
    char = char === 'J' ? 'I' : char; // Handle J as I
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) return [i, j];
        }
    }
    return null;
};

// 🔹 Preprocess text into valid digraphs
const prepareText = (text) => {
    text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let prepared = '';
    let i = 0;

    while (i < text.length) {
        let a = text[i];
        let b = text[i + 1];

        if (!b) {
            // Odd length → add X
            prepared += a + 'X';
            break;
        } else if (a === b) {
            // Same letters → insert X
            prepared += a + 'X';
            i++; // Only consume one character
        } else {
            prepared += a + b;
            i += 2; // Consume both characters
        }
    }

    // Ensure even length
    if (prepared.length % 2 !== 0) {
        prepared += 'X';
    }

    return prepared;
};

// 🔹 Encrypt function
export const encrypt = (text, key) => {
    if (!text || !key) throw new Error('Text and key are required');

    let matrix = generateMatrix(key);
    let prepared = prepareText(text);
    let res = '';

    for (let i = 0; i < prepared.length; i += 2) {
        let a = prepared[i], b = prepared[i + 1];
        let posA = findPosition(matrix, a);
        let posB = findPosition(matrix, b);

        if (!posA || !posB) {
            throw new Error(`Invalid characters in text: ${a}${b}`);
        }

        let [r1, c1] = posA;
        let [r2, c2] = posB;

        if (r1 === r2) {
            // Same row: shift right
            res += matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
        } else if (c1 === c2) {
            // Same column: shift down
            res += matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];
        } else {
            // Rectangle: swap columns
            res += matrix[r1][c2] + matrix[r2][c1];
        }
    }
    return res;
};

// 🔹 Decrypt function
export const decrypt = (text, key) => {
    if (!text || !key) throw new Error('Text and key are required');
    if (text.length % 2 !== 0) throw new Error('Encrypted text must have even length');

    let matrix = generateMatrix(key);
    let res = '';

    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i + 1];
        let posA = findPosition(matrix, a);
        let posB = findPosition(matrix, b);

        if (!posA || !posB) {
            throw new Error(`Invalid characters in encrypted text: ${a}${b}`);
        }

        let [r1, c1] = posA;
        let [r2, c2] = posB;

        if (r1 === r2) {
            // Same row: shift left
            res += matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
        } else if (c1 === c2) {
            // Same column: shift up
            res += matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];
        } else {
            // Rectangle: swap columns
            res += matrix[r1][c2] + matrix[r2][c1];
        }
    }

    // Remove padding X if it was added during encryption
    if (res.endsWith('X')) {
        res = res.slice(0, -1);
    }

    return res;
};

// Optional: Helper function to format output with spaces
export const formatPlayfairOutput = (text, groupSize = 4) => {
    return text.match(new RegExp(`.{1,${groupSize}}`, 'g')).join(' ');
};
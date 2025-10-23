// backend/algorithms/railFenceCipher.js

// Encrypt function
export function encrypt(text, key) {
    if (!text || key < 2) return '';

    const rail = Array.from({ length: key }, () => Array(text.length).fill('\n'));
    let dir_down = false;
    let row = 0, col = 0;

    for (let i = 0; i < text.length; i++) {
        if (row === 0 || row === key - 1) dir_down = !dir_down;
        rail[row][col++] = text[i];
        dir_down ? row++ : row--;
    }

    let result = '';
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < text.length; j++) {
            if (rail[i][j] !== '\n') result += rail[i][j];
        }
    }

    return result;
}

// Decrypt function
export function decrypt(cipher, key) {
    if (!cipher || key < 2) return '';

    const rail = Array.from({ length: key }, () => Array(cipher.length).fill('\n'));

    // Step 1: mark the positions with '*'
    let dir_down = false;
    let row = 0, col = 0;

    for (let i = 0; i < cipher.length; i++) {
        if (row === 0) dir_down = true;
        if (row === key - 1) dir_down = false;
        rail[row][col++] = '*';
        dir_down ? row++ : row--;
    }

    // Step 2: fill the letters in marked positions
    let index = 0;
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < cipher.length; j++) {
            if (rail[i][j] === '*' && index < cipher.length) {
                rail[i][j] = cipher[index++];
            }
        }
    }

    // Step 3: read the letters in zig-zag manner
    let result = '';
    row = 0;
    col = 0;
    for (let i = 0; i < cipher.length; i++) {
        if (row === 0) dir_down = true;
        if (row === key - 1) dir_down = false;
        result += rail[row][col++];
        dir_down ? row++ : row--;
    }

    return result;
}

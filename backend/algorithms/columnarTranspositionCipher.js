// backend/algorithms/columnarCipher.js

// Encrypt function (Dynamic key)
export function encrypt(text, key) {
    if (!text || !key) return '';

    let cipher = '';
    let kIndex = 0;

    const msgLen = text.length;
    const msgArr = Array.from(text);
    const keyArr = Array.from(key).sort();

    const col = key.length;
    const row = Math.ceil(msgLen / col);

    // Padding with '_'
    const fillNull = (row * col) - msgLen;
    for (let i = 0; i < fillNull; i++) {
        msgArr.push('_');
    }

    // Create matrix row-wise
    const matrix = [];
    for (let i = 0; i < msgArr.length; i += col) {
        matrix.push(msgArr.slice(i, i + col));
    }

    // Read column-wise using sorted key
    for (let i = 0; i < col; i++) {
        const currIdx = key.indexOf(keyArr[kIndex]);
        for (const r of matrix) {
            cipher += r[currIdx];
        }
        kIndex++;
    }

    return cipher;
}

// Decrypt function (Dynamic key)
export function decrypt(cipher, key) {
    if (!cipher || !key) return '';

    let msg = '';
    let kIndex = 0;
    let msgIndex = 0;

    const msgLen = cipher.length;
    const msgArr = Array.from(cipher);
    const col = key.length;
    const row = Math.ceil(msgLen / col);
    const keyArr = Array.from(key).sort();

    const decMatrix = [];
    for (let i = 0; i < row; i++) {
        decMatrix.push(Array(col).fill(null));
    }

    // Fill matrix column-wise based on key order
    for (let i = 0; i < col; i++) {
        const currIdx = key.indexOf(keyArr[kIndex]);
        for (let j = 0; j < row; j++) {
            decMatrix[j][currIdx] = msgArr[msgIndex++];
        }
        kIndex++;
    }

    // Flatten into a single string
    msg = decMatrix.flat().join('');

    // Remove padding underscores
    const nullCount = (msg.match(/_/g) || []).length;
    if (nullCount > 0) {
        msg = msg.slice(0, -nullCount);
    }

    return msg;
}

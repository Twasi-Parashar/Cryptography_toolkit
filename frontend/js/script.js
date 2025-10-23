// Main Controller
const algorithmSelect = document.getElementById('algorithm');
const resultText = document.getElementById('result-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');

// Show/hide input blocks dynamically
algorithmSelect.addEventListener('change', () => {
    const algo = algorithmSelect.value;
    document.querySelectorAll('.algo-inputs').forEach(div => {
        div.style.display = div.dataset.algo === algo ? 'block' : 'none';
    });
});

// Attach event listeners
encryptBtn.addEventListener('click', () => handleAction('encrypt'));
decryptBtn.addEventListener('click', () => handleAction('decrypt'));

// Handle encryption/decryption action
async function handleAction(type) {
    const algorithm = algorithmSelect.value;
    const text = document.getElementById('text').value.trim();

    if (!text) {
        resultText.textContent = '⚠️ Please enter text.';
        return;
    }

    // Prepare payload based on selected algorithm
    let payload = { text };

    if (algorithm === 'caesar') {
        const shift = document.getElementById('shift').value;
        if (shift === '') {
            resultText.textContent = '⚠️ Please enter shift value.';
            return;
        }
        payload.shift = Number(shift);

    } else if (algorithm === 'affine') {
        const a = document.getElementById('a').value;
        const b = document.getElementById('b').value;
        if (a === '' || b === '') {
            resultText.textContent = '⚠️ Please enter a and b.';
            return;
        }
        payload.a = Number(a);
        payload.b = Number(b);

    } else if (algorithm === 'playfair') {
        const key = document.getElementById('key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter a key.';
            return;
        }
        payload.key = key;

    } else if (algorithm === 'hill') {
        const key = document.getElementById('hill-key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter a key.';
            return;
        }
        if (key.length !== 9) {
            resultText.textContent = '⚠️ Hill Cipher key must be 9 letters.';
            return;
        }
        payload.key = key;
    } else if (algorithm === 'vigenere') {
        const key = document.getElementById('vigenere-key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter a key.';
            return;
        }
        payload.key = key;
    } else if (algorithm === 'railfence') {
        const key = document.getElementById('railfence-key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter the number of rails.';
            return;
        }
        payload.key = key;
    } else if (algorithm === 'columnar') {
        const key = document.getElementById('columnar-key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter the columnar key.';
            return;
        }
        payload.key = key;
    }
    else if (algorithm === 'des') {
        const key = document.getElementById('des-key').value.trim();
        if (!key) {
            resultText.textContent = '⚠️ Please enter a key.';
            return;
        }
        if (key.length !== 16) {
            resultText.textContent = '⚠️ DES key must be 16 hexadecimal characters.';
            return;
        }
        payload.key = key;
    }





    try {
        // Dynamically import the module for selected algorithm
        const module = await import(`./algorithms/${algorithm}.js`);

        // Call the send function in the module
        const result = await module.send(payload, type);

        // Display result
        if (result) resultText.textContent = result;

    } catch (err) {
        console.error(err);
        resultText.textContent = '⚠️ Error: ' + (err.message || 'Could not send request.');
    }
}

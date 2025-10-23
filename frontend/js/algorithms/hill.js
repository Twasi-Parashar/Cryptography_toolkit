// Hill Cipher frontend module
export async function send(payload, type) {
    // payload contains { text, key }
    const { text, key } = payload;

    if (!key) {
        document.getElementById('result-text').textContent = '⚠️ Please enter a key.';
        return;
    }

    // Check Hill key length
    if (key.length !== 9) {
        document.getElementById('result-text').textContent =
            '⚠️ Hill Cipher key must be 9 letters.';
        return;
    }

    const body = { text, key };
    const url = `http://localhost:4000/api/hill/${type}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (data.result) {
            document.getElementById('result-text').textContent = data.result;
            return data.result; // return for consistency
        } else {
            document.getElementById('result-text').textContent =
                '⚠️ ' + (data.error || 'Unexpected response from server.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        document.getElementById('result-text').textContent =
            '⚠️ Error connecting to backend.';
    }
}

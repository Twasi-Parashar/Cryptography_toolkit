// Affine Cipher frontend module
export async function send(payload, type) {
    const { text, a, b } = payload;

    if (a === undefined || b === undefined || isNaN(a) || isNaN(b)) {
        document.getElementById('result-text').textContent = '⚠️ Enter valid numbers for a and b.';
        return;
    }

    const body = { text, a, b };
    const url = `http://localhost:4000/api/affine/${type}`;

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
            document.getElementById('result-text').textContent = '⚠️ ' + (data.error || 'Unexpected response from server.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        document.getElementById('result-text').textContent = '⚠️ Error connecting to backend.';
    }
}

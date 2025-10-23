// Caesar Cipher frontend module
export async function send(payload, type) {
    const { text, shift } = payload;

    if (shift === undefined || isNaN(shift)) {
        document.getElementById('result-text').textContent = '⚠️ Enter a valid shift number.';
        return;
    }

    const body = { text, shift };
    const url = `http://localhost:4000/api/caesar/${type}`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (data.result) {
            document.getElementById('result-text').textContent = data.result;
            return data.result; // return for consistency with script.js
        } else {
            document.getElementById('result-text').textContent = '⚠️ ' + (data.error || 'Unexpected response from server.');
        }
    } catch (err) {
        console.error('Fetch error:', err);
        document.getElementById('result-text').textContent = '⚠️ Error connecting to backend.';
    }
}

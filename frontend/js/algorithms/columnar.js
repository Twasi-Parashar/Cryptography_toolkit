// js/algorithms/columnar.js

export async function send(payload, type) {
    const { text, key } = payload;

    // Validate inputs
    if (!key) {
        document.getElementById('result-text').textContent = '⚠️ Please enter the columnar key.';
        return;
    }

    const body = { text, key };
    const url = `http://localhost:4000/api/columnar/${type}`; // Matches backend route structure

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        // Display result or error
        if (data.result) {
            document.getElementById('result-text').textContent = data.result;
            return data.result; // Return result for consistency
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

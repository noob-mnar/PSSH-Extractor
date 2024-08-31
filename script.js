function extractData() {
    const mpdUrl = document.getElementById('mpd-url').value;
    
    if (mpdUrl) {
        const apiUrl = `https://apilab.buddyxiptv.com/?url=${encodeURIComponent(mpdUrl)}`;
        console.log('Fetching URL:', apiUrl);
        
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Response Status:', response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response Data:', data);
            if (data.status === 'success') {
                document.getElementById('kid-output').value = data.KIDs.join(', ');
                document.getElementById('pssh-output').value = data.PSSHs.join(', ');
                document.getElementById('credit-output').textContent = data.credit;
                document.getElementById('results').style.display = 'block';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            alert('Error: ' + error.message);
        });
    } else {
        alert('Please enter a valid MPD URL.');
    }
}

function copyToClipboard(elementId) {
    const textArea = document.getElementById(elementId);
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(textArea.value)
        .then(() => {
            alert('Copied to clipboard');
        })
        .catch(err => {
            console.error('Copy failed:', err);
        });
}

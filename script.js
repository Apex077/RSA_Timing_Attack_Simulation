let attemptCount = 50;
let timingData = [];
let privateKey, publicKey;

// Initialize RSA keys
const rsa = forge.pki.rsa;
rsa.generateKeyPair({ bits: 2048, workers: -1 }, (err, keypair) => {
    if (!err) {
        privateKey = keypair.privateKey;
        publicKey = keypair.publicKey;
    }
});

const ctx = document.getElementById('timingChart').getContext('2d');
const timingChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Decryption Timing (ms)',
            data: [],
            pointBackgroundColor: [],
            borderColor: 'rgba(0, 123, 255, 0.5)',
            borderWidth: 2,
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Timing (ms)' }
            }
        },
        plugins: {
            legend: { display: true, position: 'top' }
        }
    }
});

function startSimulation() {
    const message = document.getElementById("messageInput").value;
    const attemptInput = document.getElementById("attemptCountInput").value;

    // Check if both textboxes are filled
    if (!message) {
        alert("Please enter a message to send.");
        return;
    }
    if (!attemptInput) {
        alert("Please enter the number of decryption attempts.");
        return;
    }

    attemptCount = parseInt(attemptInput);

    if (!publicKey || !privateKey) {
        alert("RSA keys are still generating. Please wait.");
        return;
    }

    // Encrypt message
    const encryptedMessage = publicKey.encrypt(message);

    // Display encrypted message on the receiver
    document.getElementById("receivedMessage").innerText = `Encrypted Message: ${encryptedMessage}`;
    document.getElementById("sendButton").disabled = true;

    // Simulate timing attack in the Attacker component
    timingData = [];
    for (let i = 0; i < attemptCount; i++) {
        (function (i) {
            setTimeout(() => {
                const timing = simulateDecryptionAttack(encryptedMessage);
                timingData.push(timing);

                document.getElementById("attemptDisplay").innerText = `Attempt: ${i + 1} of ${attemptCount}`;
                document.getElementById("timingDisplay").innerText = `Timing: ${timing} ms`;

                timingChart.data.labels.push(`Attempt ${i + 1}`);
                timingChart.data.datasets[0].data.push(timing);
                timingChart.data.datasets[0].pointBackgroundColor.push(timing > 150 ? 'red' : 'green');
                timingChart.update();
            }, i * 500);
        })(i);
    }

    setTimeout(() => {
        document.getElementById("sendButton").disabled = false;
    }, attemptCount * 500);
}

function simulateDecryptionAttack(encryptedMessage) {
    const start = performance.now();
    privateKey.decrypt(encryptedMessage);
    const end = performance.now();

    const timing = end - start + (Math.random() > 0.5 ? 50 : 0); // Add random delay to simulate timing difference
    document.getElementById("timingBar").style.width = timing + 'px';
    document.getElementById("timingBar").style.backgroundColor = timing > 150 ? 'red' : 'green';

    return timing;
}


const videoElement = document.getElementById('videoElement');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let stream;

async function startStream() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
        startButton.disabled = true;
        stopButton.disabled = false;
    } catch (err) {
        console.error("Error accessing the camera:", err);
        alert("Could not access the camera. Please check your permissions.");
    }
}

function stopStream() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

startButton.addEventListener('click', startStream);
stopButton.addEventListener('click', stopStream);
window.addEventListener('beforeunload', stopStream);
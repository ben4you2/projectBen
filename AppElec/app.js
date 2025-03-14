// Load face detection models
await faceapi.nets.tinyFaceDetector.loadFromUri('/models');

// Request camera/mic access with user consent
const video = document.getElementById('video');
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true // Optional: Enable for voice
    });
    video.srcObject = stream;
    startFaceDetection();
    startVoiceCapture();
  } catch (err) {
    alert("Permission denied. Demo requires camera/mic access.");
  }
});

// Real-time face detection (no biometric storage)
async function startFaceDetection() {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );
    document.getElementById('faceResults').innerHTML =
      `Faces detected: ${detections.length}`;
  }, 1000); // Process every 1s
}

// Voice capture (transcribe only, no speaker ID)
function startVoiceCapture() {
  const speechRecognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
  speechRecognition.continuous = true;
  speechRecognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    document.getElementById('voiceResults').innerHTML =
      `Speech detected: "${transcript}"`;
  };
  speechRecognition.start();
}


/*Alert*/
async function presentAlert(header, subHeader, message) {
  const alert = document.createElement('ion-alert');
  alert.header = 'Ben4you Technology';
  alert.subHeader = 'The program is working with Ben';
  alert.message = 'A message should be a short, complete and full sentence.';
  alert.background = 'darkgrey';
  alert.buttons = ['Ok']['Cancel'];
  
  
  document.body.appendChild(alert);
  await alert.present();
}
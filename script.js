const video = document.getElementById('video');
const music = document.getElementById('background-music');
const startOverlay = document.getElementById('start-overlay');

startOverlay.addEventListener('click', () => {
  music.play().then(() => {
    console.log("✅ Music playing");
  }).catch((err) => {
    console.error("❌ Music failed to play:", err);
  });

  startOverlay.classList.add('fade');
  setTimeout(() => startOverlay.remove(), 600);

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const videoDevices = devices.filter(device => device.kind === 'videoinput');

    const backCamera = videoDevices.find(device =>
      device.label.toLowerCase().includes('back') ||
      device.label.toLowerCase().includes('rear')
    );

    const constraints = {
      video: backCamera
        ? { deviceId: { exact: backCamera.deviceId } }
        : { facingMode: { exact: "environment" } }
    };

    return navigator.mediaDevices.getUserMedia(constraints);
  })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("❌ Camera access failed:", err);
  });
});

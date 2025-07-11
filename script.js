const video = document.getElementById('video');

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
  console.error("Camera access failed:", err);
});
const music = document.getElementById('background-music');

// Start playing after user interacts (to comply with browser policies)
document.body.addEventListener('click', () => {
  music.play().catch(() => {
    console.log('Playback prevented by browser autoplay policy');
  });
});
startOverlay.addEventListener('click', () => {
  // Try to play background music
  music.play().then(() => {
    console.log("Music playing");
  }).catch((err) => {
    console.error("Music play blocked:", err);
  });

  // (continue with rest of your app logic here)
  startOverlay.classList.add('fade');
  setTimeout(() => startOverlay.remove(), 600);

  // Example: activate camera or livestream here
});



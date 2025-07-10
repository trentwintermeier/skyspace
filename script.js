const video = document.getElementById('video');
const skyFeed = document.getElementById('sky-feed');
const music = document.getElementById('background-music');
const startOverlay = document.getElementById('start-overlay');

// List of livestreams (YouTube embeds or direct links)
const livestreams = [
  "https://www.youtube.com/embed/21X5lGlDOfg?autoplay=1&mute=1&controls=0&playsinline=1", // NASA live
  "https://www.youtube.com/embed/9Auq9mYxFEE?autoplay=1&mute=1&controls=0&playsinline=1", // BBC News sky cam
  "camera" // special value to trigger AR camera
];

// Randomly select a stream or the camera
const randomIndex = Math.floor(Math.random() * livestreams.length);
const selected = livestreams[randomIndex];

// Wait for user interaction to start everything
startOverlay.addEventListener('click', () => {
  startOverlay.classList.add('fade');

  // Start background music
  music.play().catch(() => {
    console.log("Music autoplay blocked.");
  });

  // Activate the chosen feed
  if (selected === "camera") {
    skyFeed.style.display = "none";
    video.style.display = "block";

    // Get rear camera
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

  } else {
    video.style.display = "none";
    skyFeed.style.display = "block";
    skyFeed.src = selected;
  }

  // Hide the overlay after short delay
  setTimeout(() => startOverlay.remove(), 600);
});

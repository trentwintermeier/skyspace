const video = document.getElementById('video');

navigator.mediaDevices.enumerateDevices().then(devices => {
  const videoDevices = devices.filter(device => device.kind === 'videoinput');

  // Look for a device labeled 'back' or 'rear'
  const backCamera = videoDevices.find(device =>
    device.label.toLowerCase().includes('back') ||
    device.label.toLowerCase().includes('rear')
  );

  const constraints = {
    video: backCamera
      ? { deviceId: { exact: backCamera.deviceId } }
      : { facingMode: { exact: "environment" } } // fallback in case label detection fails
  };

  return navigator.mediaDevices.getUserMedia(constraints);
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  console.error("Camera access failed:", err);
});

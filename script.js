const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({
  video: {
  facingMode: { exact: "environment" }
  }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  console.error("Camera access failed:", err);
});

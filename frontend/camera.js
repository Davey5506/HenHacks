document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("webcam");
    const captureButton = document.querySelector("button");
    
    // Create canvas element (not appended to the DOM)
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera:", error);
        });
    
    // Capture photo
    captureButton.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous image
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    });
    
    // Apply styles for better alignment
    document.body.style.display = "inline-block";
    document.body.style.textAlign = "center";
    document.body.style.margin = "50px";
    
    const container = document.getElementById("container");
    container.style.height = "375px";
    container.style.width = "500px";
    container.style.backgroundColor = "#565656";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    
    captureButton.style.background = "rgb(11, 143, 243)";
    captureButton.style.color = "white";
    captureButton.style.width = "200px";
    captureButton.style.height = "50px";
    captureButton.style.textAlign = "center";
    captureButton.style.marginTop = "10px";
});

document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("webcam");
    const captureButton = document.querySelector("button");
    const container = document.getElementById("container");
    
    // Create canvas element
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    container.appendChild(canvas);
    
    const context = canvas.getContext("2d");
    
    // Access the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera:", error);
        });
    
    // Capture and download photo
    captureButton.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "photo.png";
        link.click();
    });
    
    // Apply styles for better alignment
    document.body.style.display = "inline-block";
    document.body.style.textAlign = "center";
    document.body.style.margin = "50px";
    
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

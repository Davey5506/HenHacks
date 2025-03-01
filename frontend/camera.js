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

        // Convert the image to base64
        const imageData = canvas.toDataURL('image/jpeg');

        // Send the image data to the backend
        fetch('http://127.0.0.1:5000/process_image', {  // Flask server address
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response from backend:', data);
        })
        .catch(error => {
            console.error('Error sending image to backend:', error);
        });
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

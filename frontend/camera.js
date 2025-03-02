document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("webcam");
    const captureButton = document.querySelector("button");
    const wisdomOfGemini = document.getElementById("response");
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

        const imagedata = canvas.toDataURL("image/png");
        const textdata = userInput.value;
        fetch('http://127.0.0.1:5000/process_image', {  // Flask server address
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imagedata, text: textdata })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
            wisdomOfGemini.textContent = data.result;
        })
        .catch(error => {
            wisdomOfGemini.textContent = 'Error sending image to backend:' + error.result;
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

const userInput = document.getElementById('userInput');
const takePhotoButton = document.querySelector('button'); // Select the button

takePhotoButton.addEventListener('click', () => {
    // Perform any other actions (e.g., take a photo)

    // Reset the textbox
    userInput.value = "";
});

userInput.addEventListener('input', () => {
    console.log(userInput.value); // Log the input value to the console
});

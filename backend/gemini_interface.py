from google import genai
from google.genai import Client
from PIL import Image
import dotenv
import preprocessor

async def interprit_image(client:Client, image:Image, text:str) -> str:
    response = client.models.generate_content(model="gemini-2.0-flash",
                                              contents=[
                                                  "Based on the image you provided, and the following symptoms: " + text + ". Provide some potential conditions for discussion with a healthcare professional.",
                                                  image
                                              ])
    print(response.text)
    return response.text

async def main(path:str, text: str) -> str:
    # Load the API key from the .env file
    api_key = dotenv.dotenv_values(".env").get("API_KEY")
    if api_key is None:
        print("API_KEY not set")
        exit(-1)

    # Connect to the Gemini API
    client = genai.Client(api_key=api_key)
    if client is None:
        print("Could not connect to gemini")
        exit(-2)

    # Load the image and pre-process it
    image_data = path.split(',')[-1]
    print(image_data)

    # Send the image to the Gemini API
    response = await interprit_image(client, image_data, text)
    return response
from google import genai
from google.genai import Client
import preprocessor
import asyncio
import dotenv


async def interprit_image(client:Client, image):
    response = client.models.generate_content(model="gemini-2.0-flash",
                                              contents=[
                                                  "What medical conditions are evident in this image?",
                                                  {"mime-type": "image/jpeg"},
                                                  image
                                              ])
    print(response.text)
    return response.text

async def main() -> None:
    api_key = dotenv.dotenv_values(".env").get("API_KEY")
    if api_key is None:
        print("API_KEY not set")
        exit(-1)

    client = genai.Client(api_key=api_key)
    if client is None:
        print("Could not connect to gemini")
        exit(-2)

    while True:
        image = input("Enter the path to the image: ")
        image = await preprocessor.resize_image(image)
        response = await interprit_image(client, image)

if __name__ == '__main__':
    asyncio.run(main())
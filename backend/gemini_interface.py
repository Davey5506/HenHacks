from google import genai
from google.genai import types
import asyncio
import cv2
import dotenv
from numpy.f2py.auxfuncs import throw_error

async def interprit_image(client, image):
    response = client.Models.generate_content(model="gemini-2.0-flash",
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
        throw_error("API_KEY not set")

    client = genai.Client(api_key=api_key)
    if client is None:
        throw_error("Could not connect to gemini")


if __name__ == '__main__':
    asyncio.run(main())
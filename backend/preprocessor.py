import cv2
import asyncio
from PIL import Image

async def resize_image(input, output):
    image = Image.open(input)
    width, height = image.size()

    newWidth = 0
    newHeight = 0
    if height > 480:
        newHeight = 480
        newWidth = int(width * (newHeight/float(height)))
    else:
        newWidth, newHeight = width, height
    
    resized = image.resize((newWidth, newHeight), Image.LANCZOS)
    resized.save(output)




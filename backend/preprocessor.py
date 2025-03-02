from io import BytesIO
from PIL import Image, ImageEnhance
import base64

async def base64_to_img(base64_string: str) -> Image:
    base64_string = base64_string.split(',')[1]
    image_data = base64.b64decode(base64_string)
    image_stream = BytesIO(image_data)
    image = Image.open(image_stream)

    return image


async def resize_image(image: Image) -> Image:

    # Get the current size of the image
    width, height = image.size

    # Check if current size is larger than 480p resolution
    if height > 480:
        new_height = 480
        new_width = int(width * (new_height/float(height)))
    else:
        new_width, new_height = width, height

    # Resize the image
    resized = image.resize((new_width, new_height))
    return resized

async def adjust_contrast(image: Image) -> Image:
    # Change the contrast of the image
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.5)
    return image

async def adjust_brightness(image: Image) -> Image:
    # Change the brightness of the image
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(1.5)
    return image

async def adjust_saturation(image: Image) -> Image:
    # Change the saturation of the image
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(1.5)
    return image
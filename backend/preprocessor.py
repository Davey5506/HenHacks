from PIL import Image, ImageEnhance

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
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.5)
    return image

async def adjust_brightness(image: Image) -> Image:
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(1.5)
    return image

async def adjust_saturation(image: Image) -> Image:
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(1.5)
    return image

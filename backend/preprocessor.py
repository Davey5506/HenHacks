from PIL import Image

async def resize_image(image: Image) -> Image:
    width, height = image.size

    if height > 480:
        new_height = 480
        new_width = int(width * (new_height/float(height)))
    else:
        new_width, new_height = width, height
    
    resized = image.resize((new_width, new_height))
    return resized

async def adjust_contrast(image: Image) -> Image:
    return image

async def adjust_brightness(image: Image) -> Image:
    return image

async def adjust_saturation(image: Image) -> Image:
    return image

from PIL import Image, ImageEnhance


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
    try:
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.5)
    except Exception as e:
        print(e)

    return image

async def adjust_brightness(image: Image) -> Image:
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(1.5)
    return image

async def adjust_saturation(image: Image) -> Image:
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(1.5)
    return image

from PIL import Image

async def resize_image(path: str) -> Image:
    image = Image.open(path)
    width, height = image.size

    if height > 480:
        new_height = 480
        new_width = int(width * (new_height/float(height)))
    else:
        new_width, new_height = width, height
    
    resized = image.resize((new_width, new_height))
    return resized



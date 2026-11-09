from PIL import Image
import os


image = Image.open("src/assets/weather-images.png")


os.makedirs("weather-icons", exist_ok=True)


width, height = image.size

columns = 4
rows = 2


names = [
    "sunny.png",
    "cloudy.png",
    "partly-cloudy.png",
    "rainy.png",
    "stormy.png",
    "snowy.png",
    "windy.png",
    "foggy.png"
]


crop_width = width // columns
crop_height = height // rows

index = 0

for row in range(rows):
    for col in range(columns):

        left = col * crop_width
        top = row * crop_height
        right = left + crop_width
        bottom = top + crop_height

    
        cropped = image.crop((left, top, right, bottom))

       
        cropped.save(
            os.path.join("weather-icons", names[index])
        )

        index += 1

print("Successfully separated all 8 weather images!")
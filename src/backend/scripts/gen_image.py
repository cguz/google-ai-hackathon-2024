import os
import sys
from datetime import datetime

import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

PROJECT_ID = 'powerful-genre-419511'
LOCATION = 'us-central1'

def create_image(prompt):
    model = ImageGenerationModel.from_pretrained("imagegeneration@006")
    images = model.generate_images(
        prompt=prompt,
        number_of_images=2,
        language="en",
        # add_watermark=False,
        # seed=100,
        aspect_ratio="1:1",
        safety_filter_level="block_some",
        person_generation="allow_adult",
    )
    image_names = []
    for idx, image in enumerate(images):
        # Generate a unique filename based on the current date and time
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        image_name = f'./images/gi_{idx}_{timestamp}.jpg'
        image.save(location=f'{image_name}', include_generation_parameters=False)
        print(f"Created output image '{image_name}' using {len(images[0]._image_bytes)} bytes")
        image_names.append(image_name)
    return image_names

if __name__ == "__main__":
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    # Retrieve the argument passed from Node.js
    prompt = sys.argv[1]

    if not os.path.exists('images'):
        os.makedirs('images')
    result = create_image(prompt)
    print(result)
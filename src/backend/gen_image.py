import os
import sys

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
    for idx, image in enumerate(images):
        image.save(location=f'./images/generates_image_{idx}.jpg', include_generation_parameters=False)
        print(f"Created output image using {len(images[0]._image_bytes)} bytes")


if __name__ == "__main__":
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    # Retrieve the argument passed from Node.js
    prompt = sys.argv[1]

    if not os.path.exists('images'):
        os.makedirs('images')
    result = create_image(prompt)
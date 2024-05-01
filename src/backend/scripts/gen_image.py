import os
import sys
import json
from datetime import datetime

import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

PROJECT_ID = 'powerful-genre-419511'
LOCATION = 'us-central1'

def create_image(prompt, filename1, filename2):

    model = ImageGenerationModel.from_pretrained("imagegeneration@006")
    images = model.generate_images(
        prompt=prompt,
        number_of_images=1,
        language="en",
        # add_watermark=False,
        # seed=100,
        aspect_ratio="1:1",
        safety_filter_level="block_some",
        person_generation="allow_adult",
    )

    for idx, image in enumerate(images):
        image.save(location=f'{filename1}', include_generation_parameters=False)
        # print(f"Created output image '{image_name}' using {len(images[0]._image_bytes)} bytes")
        

if __name__ == "__main__":
    vertexai.init(project=PROJECT_ID, location=LOCATION)
    # Retrieve the argument passed from Node.js
    prompt = sys.argv[1]
    filename1 = sys.argv[2]
    filename2 = sys.argv[3]

    output_dir = os.path.dirname(os.path.abspath(filename1))
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    create_image(prompt, filename1, filename2)
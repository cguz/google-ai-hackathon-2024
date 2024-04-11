import vertexai
from vertexai.preview.generative_models import GenerativeModel

project_id = 'powerful-genre-419511'
location = 'us-central1'

vertexai.init(project=project_id, location=location)

model = GenerativeModel('gemini-pro')
response = model.generate_content('can you write a small children song regarding snowman?')

print(response.text)
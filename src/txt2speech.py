"""Synthesizes speech from the input string of text."""
from google.cloud import texttospeech

# Disable ALSA-related warnings/errors (not necessary if audio output is not needed)
import os
os.environ["PYGAME_HIDE_SUPPORT_PROMPT"] = "1"
os.environ["SDL_AUDIODRIVER"] = "dummy"

def synthesize_text_to_file(input_file_path, output_file):
    
    # Read input text from the specified file
    with open(input_file_path, "r") as file:
        input_text = file.read()

    # Initialize TextToSpeechClient
    client = texttospeech.TextToSpeechClient()

    # Set up input text, voice selection, and audio configuration
    input_text = texttospeech.SynthesisInput(text=input_text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-US-Standard-C",
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=1.0
    )

    # Synthesize speech and save to file
    response = client.synthesize_speech(
        input=input_text,
        voice=voice,
        audio_config=audio_config
    )

    # Write audio content to the specified output file
    with open(output_file, "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to file "{output_file}"')

if __name__ == "__main__":
    # Specify input text and output file path
    input_text = "lyric.txt"
    output_file = "output.mp3"

    # Synthesize text to MP3 file
    synthesize_text_to_file(input_text, output_file)
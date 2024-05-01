const { generateContent } = require('./gemini.vertexai');
const { PythonShell } = require('python-shell');

const getTitle = async (prompt) => {
    question = `${process.env.VAI_PROMPT_TITLE}` + prompt + "";
    const response = await generateContent(question);
    const finalString = response.join(' ');
    return finalString;
};

const getLyric = async (prompt) => {
    question = `${process.env.VAI_PROMPT_LYRIC}` + prompt + "";
    const response = await generateContent(question);
    const finalString = response.join(' ');
    return finalString;
};

const getCover = async (prompt) => {

  // Generate unique filenames with the current date and time
  const timestamp = new Date().toISOString().replace(/[-T:.]/g, '');
  const filename1 = `${process.env.VAI_PATH_BACK_COVER}gi_${timestamp}.jpg`;
  const filename2 = `${process.env.VAI_PATH_BACK_COVER}gi_${timestamp}.jpg`;

  let stringToPass = `${process.env.VAI_PROMPT_COVER}` + prompt;

  let options = {
    mode: 'json',
    pythonPath: 'python3', // Change this to your Python interpreter path if necessary
    pythonOptions: ['-u'], // unbuffered stdout and stderr
    scriptPath: './scripts', // Update the path to the directory containing the Python script
    args: [stringToPass, filename1, filename2]
  };

  try{
    const result = await PythonShell.run('gen_image.py', options);
    if (result.err) {
      console.error('Error:', result.err);
      throw result.err;
    } else {
      console.log('Python function getCover return:', result.toString());
      return `${process.env.VAI_PATH_FRONT_COVER}gi_${timestamp}.jpg`;
    }
  } catch(error){
    console.error('Error generating cover:', error);
    return `${process.env.VAI_PATH_FRONT_COVER}gi_error.jpg`;
  }
};

const getSpeech = async (lyrics) => {
  const timestamp = new Date().toISOString().replace(/[-T:.]/g, '');
  const filename = `${process.env.VAI_PATH_BACK_MP3}ga_${timestamp}.mp3`;
  let options = {
    mode: 'json',
    pythonPath: 'python3', // Change this to your Python interpreter path if necessary
    pythonOptions: ['-u'], // unbuffered stdout and stderr
    scriptPath: './scripts', // Update the path to the directory containing the Python script
    args: [lyrics, filename]
  };

  try {
    const result = await PythonShell.run('gen_audio.py', options);
    if (result.err) {
      console.error('Error:', result.err);
      throw result.err;
    } else {
      console.log('Python function getSpeech return:', result.toString());
      return `${process.env.VAI_PATH_FRONT_MP3}ga_${timestamp}.mp3`;
    }
  }catch (error) {
    console.error('Error generating speech:', error);
    return `${process.env.VAI_PATH_FRONT_MP3}ga_error.mp3`;
  }
};

module.exports = { getTitle, getLyric, getCover, getSpeech };
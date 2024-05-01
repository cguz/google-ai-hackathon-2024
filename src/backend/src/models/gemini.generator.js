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

  PythonShell.run('gen_image.py', { ...options }, function (err, result) {
    if (err) {
      console.error('Error:', err);
      throw err;
    } else {
      console.log('Python function returned:', result.toString());
    }
  });

  return `${process.env.VAI_PATH_FRONT_COVER}gi_${timestamp}.jpg`;

};

const getSpeech = () => {
  //process.env.VAI_PROMPT_SPEECH;
  //process.env.VAI_PATH_BACK_MP3;
  //process.env.VAI_PATH_FRONT_MP3;

  return "code to generate speech";
};

module.exports = { getTitle, getLyric, getCover, getSpeech };
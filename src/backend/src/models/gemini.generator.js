const { generateContent } = require('./gemini.vertexai');
const { PythonShell } = require('python-shell');

const getTitle = async (prompt) => {
    question = "Generate only one title for a song based on the following prompt \n" + prompt + "";
    const response = await generateContent(question);
    const finalString = response.join(' ');
    return finalString;
};

const getLyric = async (prompt) => {
    question = "Generate one song lyrics with two Verses and one chorus for the following prompt \n" + prompt + "";
    const response = await generateContent(question);
    const finalString = response.join(' ');
    return finalString;
};

const getCover = async (prompt) => {

  // Generate unique filenames with the current date and time
  const timestamp = new Date().toISOString().replace(/[-T:.]/g, '');
  const filename1 = `./media/images/gi_${timestamp}.jpg`;
  const filename2 = `./media/images/gi_${timestamp}.jpg`;

  let stringToPass = 'generate a cover image for following prompt ' + prompt;

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

  return filename1;

};

const getSpeech = async (lyrics) => {
    const timestamp = new Date().toISOString().replace(/[-T:.]/g, '');
    const filename = `./media/audio/ga_${timestamp}.mp3`;
    let options = {
      mode: 'json',
      pythonPath: 'python3', // Change this to your Python interpreter path if necessary
      pythonOptions: ['-u'], // unbuffered stdout and stderr
      scriptPath: './scripts', // Update the path to the directory containing the Python script
      args: [lyrics, filename]
    };

    PythonShell.run('txt2speech.py', { ...options }, function (err, result) {
      if (err) {
        console.error('Error:', err);
        throw err;
      } else {
        console.log('Python function returned:', result.toString());
        return "Failed";
      }
    });
    return filename;
};

module.exports = { getTitle, getLyric, getCover, getSpeech };
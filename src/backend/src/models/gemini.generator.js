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

  return new Promise((resolve, reject) => {
      let options = {
          mode: 'text',
          pythonPath: 'python3', // Change this to your Python interpreter path if necessary
          pythonOptions: ['-u'], // unbuffered stdout and stderr
          scriptPath: './scripts' // Update the path to the directory containing the Python script
      };

      let stringToPass = 'generate a cover image for following prompt ' + prompt;

      PythonShell.run('gen_image.py', { ...options, args: [stringToPass] }, function (err, result) {
          if (err) {
              console.error('Error:', err);
              reject(err);
          } else {
              console.log('Python function returned:', result);
              resolve(result); // Resolve with the result returned by the Python script
          }
      });
  });
  
};

const getSpeech = () => {
    return "code to generate speech";
};

module.exports = { getTitle, getLyric, getCover, getSpeech };
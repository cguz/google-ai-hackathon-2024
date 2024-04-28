const { generateContent } = require('./gemini.vertexai');

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
  const { PythonShell } = require('python-shell');

  // Set the options for PythonShell
  let options = {
    mode: 'text',
    pythonPath: 'python3', // Change this to your Python interpreter path if necessary
    pythonOptions: ['-u'], // unbuffered stdout and stderr
    scriptPath: './'
  };
  
  let stringToPass = 'generate a cover image for following prompt' + prompt;
  // Call the Python function
  
  PythonShell.run('./scripts/gen_image.py', { ...options, args: [stringToPass] }, function (err, result) {
    if (err) {
      console.error('Error:', err);
      throw err;
    }
    console.log('Python function returned:', result); 
  });
    return "Success!";
};

const getSpeech = () => {
    return "code to generate speech";
};

module.exports = { getTitle, getLyric, getCover, getSpeech };
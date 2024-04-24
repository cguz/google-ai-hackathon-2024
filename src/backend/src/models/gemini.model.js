const run = async ({prompt}) => {
    // async function because getTitle,getLyric are async functions ...
    let title = await getTitle(prompt);
    let lyric = await getLyric(prompt);
    let cover =  getCover(prompt);
    let speech = getSpeech(prompt);

    let result = {
        title: title,
        lyric: lyric,
        cover: cover,
        speech: speech,
    };

    return result;
};

const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'powerful-genre-419511', location: 'us-central1'});
const model = 'gemini-1.0-pro-002';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 2048,
    'temperature': 1,
    'topP': 1,
  },
  safetySettings: [
    {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
});

/// --------------------------------------------
async function generateContent(prompt) {
    const req = {
      contents: [
        {role: 'user', parts: [{text: prompt}]}
      ],
    };
  
  
  const streamingResp = await generativeModel.generateContentStream(req);
    const responses = []
    for await (const item of streamingResp.stream) {
      // process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
      responses.push(item.candidates[0].content.parts[0].text)
    }
    return responses
  }
/// -----------------------------------  
    
const getTitle = async (prompt) => {
    question = "Generate only one title for a song based on the following prompt \n"+prompt+""
    // console.log('\n\n****Get Title\n\n')
    const response =  await generateContent(question);
    const finalString = response.join(' ');
    return finalString
  
};

const getLyric = async (prompt) => {
    question = "Generate one song lyrics with two Verses and one chorus for the following prompt \n"+prompt+""
    // console.log('\n\n****Get Lyrics\n\n')
    const response =  await generateContent(question);
    const finalString = response.join(' ');
    return finalString
};

const getCover = (prompt) => {
    return "code to generate cover";
};

const getSpeech = () => {
    return "cove to generate speech";
};

module.exports = {
    getSpeech: getSpeech,
    getCover: getCover,
    getTitle: getTitle,
    run: run,
    getLyric: getLyric,
};
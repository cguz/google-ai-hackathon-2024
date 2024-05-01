const { VertexAI } = require('@google-cloud/vertexai');

require('dotenv').config();

// Read project ID and location from environment variables
const project = process.env.VAI_PROJECT;
const location = process.env.VAI_LOCATION;

// Check if required environment variables are set
if (!project || !location) {
  throw new Error('VAI_PROJECT and VAI_LOCATION environment variables are required');
}

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project, location });
const model = process.env.VAI_MODEL;

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
        'maxOutputTokens': process.env.VAI_MAXOUTPUTTOKENS,
        'temperature': process.env.VAI_TEMPERATURE,
        'topP': process.env.VAI_TOPP,
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

async function generateContent(prompt) {
    const req = {
        contents: [
            { role: 'user', parts: [{ text: prompt }] }
        ],
    };

    const streamingResp = await generativeModel.generateContentStream(req);
    const responses = [];
    for await (const item of streamingResp.stream) {
        responses.push(item.candidates[0].content.parts[0].text);
    }
    return responses;
}

module.exports = { generateContent };

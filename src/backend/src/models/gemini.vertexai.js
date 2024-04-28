const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'powerful-genre-419511', location: 'us-central1' });
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

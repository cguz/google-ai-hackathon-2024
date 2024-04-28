const { getTitle, getLyric, getCover, getSpeech } = require('./gemini.generator');

const run = async ({ prompt }) => {
    let title = await getTitle(prompt);
    let lyric = await getLyric(prompt);
    
    // Use the promise returned by getCover
    let cover;
    try {
        cover = await getCover(prompt);
        console.log('Cover image result:', cover);
    } catch (error) {
        console.error('Error getting cover image:', error);
        // Handle the error appropriately, such as setting a default value for cover
        cover = 'Default cover image';
    }

    let speech = getSpeech(prompt);

    let result = {
        title: title,
        lyric: lyric,
        cover: cover,
        speech: speech,
    };

    return result;
};

module.exports = { run };
const { getTitle, getLyric, getCover, getSpeech } = require('./gemini.generator');

const run = async ({ prompt }) => {
    let title = await getTitle(prompt);
    
    // Remove "#" characters from the title
    title = title.replace(/^#+/, ''); 

    let lyric = await getLyric(prompt);
    
    // Use the promise returned by getCover
    let cover = await getCover(prompt);
    let speech = await getSpeech(lyric);

    let result = {
        title: title,
        lyric: lyric,
        cover: cover,
        speech: speech,
    };

    return result;
};

module.exports = { run };
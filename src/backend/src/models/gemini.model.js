const { getTitle, getLyric, getCover, getSpeech } = require('./gemini.generator');

const run = async ({ prompt }) => {
    let title = await getTitle(prompt);
    let lyric = await getLyric(prompt);
    let cover = await getCover(prompt);
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
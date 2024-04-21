const run = (prompt) => {

    let title = getTitle(prompt);
    let lyric = getLyric(prompt);
    let cover = getCover(prompt);
    let speech = getSpeech(prompt);

    let result = {
        title: title,
        lyric: lyric,
        cover: cover,
        speech: speech,
    };

    return result;
};

const getTitle = (prompt) => {
    return "code to generate lyric";
};

const getLyric = (prompt) => {
    return "code to generate lyric";
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

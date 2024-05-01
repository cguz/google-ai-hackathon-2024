const LyricModel = require('../models/lyric.model');
const GeminiModel = require('../models/gemini.model');

// Retrieve all the lyrics
const getAll = async (req, res) => {
    // #swagger.tags = ['Lyric']
    // #swagger.description = 'Endpoint to get all Lyrics.'
    try {
        const [lyric] = await LyricModel.selectAll();
        res.json(lyric);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Retrieve lyric by ID
const getLyric = async (req, res) => {
    // #swagger.tags = ['Lyric']
    // #swagger.description = 'Endpoint to get a Lyric.'
    const { id } = req.params;
    try {
        const [lyric] = await LyricModel.selectById(id);
        res.json(lyric[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Retrieve all Titles
const getTitles = async (req, res) => {
    console.log('calling get titles');
    try {
        const [titles] = await LyricModel.selectTitles();
        console.log(titles);
        res.json(titles);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Create a lyric
const create = async (req, res) => {
    
    // #swagger.tags = ['Lyric']
    // #swagger.description = 'Endpoint to create a Lyric.'
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Lyric information.',
            required: true,
            schema: { $ref: "#/definitions/lyric" }
    } */
    const { prompt } = req.body;
    try {
        const result = await GeminiModel.run({ prompt });
        
        console.log(result);
        
        function waitTwoSeconds() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve(); // Signal that the wait is complete
                }, 2000); // Wait for 2 seconds (2000 milliseconds)
            });
        }
        
        (async () => {
            await waitTwoSeconds();
            console.log("Waited for 2 seconds!");
        })();
        
        const [result_insert_db] = await LyricModel.insert( result );

        res.json(result);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Update a Lyric by ID
const update = async (req, res) => {
    // #swagger.tags = ['Lyric']
    // #swagger.description = 'Endpoint to update a Lyric.'
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Lyric information.',
            required: true,
            schema: { $ref: "#/definitions/lyric" }
    } */
    const { id } = req.params;
    const { title, lyric, cover, speech } = req.body;
    try {
        const [result] = await LyricModel.update(id, {title, lyric, cover, speech});
        const [lyric_r] = await LyricModel.selectById(id);
        res.json(lyric_r[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Remove a Lyric by ID
const deleteById = async (req, res) => {
    // #swagger.tags = ['Lyric']
    // #swagger.description = 'Endpoint to delete a Lyric.'
    const { id } = req.params;
    try {
        const [result] = await LyricModel.deleteById(id);
        res.json({ message: 'Lyric deleted successfully' });
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = {
    getAll: getAll,
    getLyric: getLyric,
    create: create,
    update: update,
    deleteById: deleteById,
    getTitles: getTitles,
};

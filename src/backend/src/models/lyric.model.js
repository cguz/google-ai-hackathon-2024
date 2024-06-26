const selectAll = () => {
    return db.query('SELECT * FROM lyrics');
};

const selectById = (id) => {
    return db.query('SELECT * FROM lyrics WHERE id = ?', [id]);
};

const selectTitles = () => {
    return db.query('SELECT id, title FROM lyrics order by id desc')
}
const insert = ({ title, lyric, cover, speech }) => {
    return db.query('INSERT INTO lyrics (title, lyric, cover, speech, session) VALUES (?, ?, ?, ?, ?)', [title, lyric, cover, speech, "session"]);
};

const update = (id, { title, lyric, cover, speech }) => {
    return db.query('UPDATE lyrics SET title = ?, lyric =?, cover =?, speech=? WHERE id = ?', [title, lyric, cover, speech, id]);
};

const deleteById = (id) => {
    return db.query('DELETE FROM lyrics WHERE id = ?', [id]);
};

const deleteAll = (id) => {
    return db.query('TRUNCATE lyrics');
};

module.exports = {
    selectAll: selectAll,
    selectById: selectById,
    insert: insert,
    update: update,
    deleteById: deleteById,
    deleteAll: deleteAll,
    selectTitles: selectTitles,
};

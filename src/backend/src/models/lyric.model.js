const selectAll = () => {
    return db.query('SELECT * FROM lyrics');
};

const selectById = (id) => {
    return db.query('SELECT * FROM lyrics WHERE id = ?', [id]);
};

const insert = ({ message, boolean_teacher, userId, teacherId }) => {
    return db.query('INSERT INTO lyrics (message, boolean_teacher, user_id, teacher_id) VALUES (?, ?, ?, ?)', [message, boolean_teacher, userId, teacherId]);
};

const update = (id, { title, lyric, cover, speech }) => {
    return db.query('UPDATE lyrics SET title = ?, lyric =?, cover =?, speech=? WHERE id = ?', [title, lyric, cover, speech, id]);
};

const deleteById = (id) => {
    return db.query('DELETE FROM lyrics WHERE id = ?', [id]);
};

module.exports = {
    selectAll: selectAll,
    selectById: selectById,
    insert: insert,
    update: update,
    deleteById: deleteById,
};

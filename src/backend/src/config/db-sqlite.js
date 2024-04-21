var sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(process.env.DB_SOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE lyrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            lyric text, 
            cover text,
            speech text,
            session text
            )`,
        (err) => {
            if (err) {
                console.log('Table already created.')
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO lyrics (title, lyric, cover, speech, session) VALUES (?,?,?,?,?)'
                db.run(insert, ["title","lyric", "./media/session/cover.jpg", "./media/session/speech.mp3", "session"])
            }
        });  
    }
});

module.exports = db;

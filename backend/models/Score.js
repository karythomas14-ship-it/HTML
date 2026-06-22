const db = require("../config/database");

const Score = {
    create: (playerName, score, callback) => {
        const sql = "INSERT INTO scores (playerName, score) VALUES (?, ?)";
        db.query(sql, [playerName, score], callback);
    },

    getTop: (callback) => {
        const sql = "SELECT * FROM scores ORDER BY score DESC LIMIT 10";
        db.query(sql, callback);
    }
};

module.exports = Score;
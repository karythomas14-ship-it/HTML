const db = require("../config/database");

const Stats = {

    getStats(callback) {
        const sql = `
            SELECT
                COUNT(*) as totalPlayers,
                MAX(score) as highestScore,
                AVG(score) as avgScore
            FROM scores
        `;

        db.query(sql, callback);
    },

    incrementPlayCount(userId, callback) {

        const sql = `
        INSERT INTO user_stats(userId,totalPlayCount,totalDuration)
        VALUES(?,1,0)
        ON DUPLICATE KEY UPDATE
        totalPlayCount = totalPlayCount + 1
        `;

        db.query(sql, [userId], (err, result) => {

            console.log("USER ID =", userId);
            console.log("MYSQL ERROR =", err);
            console.log("MYSQL RESULT =", result);

            callback(err, result);
        });
    },

    saveDuration(userId, duration, callback) {

        const sql = `
        INSERT INTO user_stats(userId,totalPlayCount,totalDuration)
        VALUES(?,0,?)
        ON DUPLICATE KEY UPDATE
        totalDuration = totalDuration + ?
        `;

        db.query(
            sql,
            [userId, duration, duration],
            (err, result) => {

                console.log("USER ID =", userId);
                console.log("DURATION =", duration);
                console.log("MYSQL ERROR =", err);
                console.log("MYSQL RESULT =", result);

                callback(err, result);
            }
        );
    }

};

module.exports = Stats;
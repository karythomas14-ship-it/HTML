const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Thomas922921@",
    database: "tetris_db"
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

module.exports = db;
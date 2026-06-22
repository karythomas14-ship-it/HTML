const Score = require("../models/Score");

// lưu điểm
exports.addScore = (req, res) => {
    console.log("INCREMENT CALLED");

    const { score, username } = req.body;

    Score.create(username, score, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Score saved"
        });

    });

};

// lấy top 10
exports.getTopScores = (req, res) => {
    Score.getTop((err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};
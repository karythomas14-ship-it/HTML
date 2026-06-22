const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Tetris Backend Running");
});

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/scores", require("./routes/scoreRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
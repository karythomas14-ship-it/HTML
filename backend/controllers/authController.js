const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = "tetris_secret_key";

// REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    User.create(username, password, (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User created successfully!" });
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  });
};

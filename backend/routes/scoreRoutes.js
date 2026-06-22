const express = require("express");

const router = express.Router();



const scoreController = require("../controllers/scoreController");



router.post("/", scoreController.addScore);

router.get("/top", scoreController.getTopScores);



module.exports = router;
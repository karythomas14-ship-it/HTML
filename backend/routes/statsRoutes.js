const express = require("express");
const router = express.Router();

const statsController = require("../controllers/statsController");
const authMiddleware = require("../middleware/authMiddleware");

// Thống kê tổng quát
router.get("/", statsController.getStats);

// Thời gian chơi
router.post(
    "/duration",
    authMiddleware,
    statsController.saveDuration
);

// Lấy key settings
router.get(
    "/settings",
    authMiddleware,
    statsController.getSettings
);

// Lưu key settings
router.put(
    "/settings",
    authMiddleware,
    statsController.saveSettings
);

// Tăng số lần chơi
router.post(
    "/increment-play-count",
    authMiddleware,
    statsController.incrementPlayCount
);

module.exports = router;
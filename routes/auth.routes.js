const authController = require("../controllers/auth.controller");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.put("/accountPassword", authMiddleware(), authController.updatePassword);

module.exports = router;
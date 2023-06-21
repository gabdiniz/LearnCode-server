const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const Like = require("../models/like");
const Course = require("../models/course");


const router = Router();

router.get("/likes", authMiddleware(), async (req, res) => {
  const { id } = req.auth;
  try {
    const likes = await Like.findAll({ where: { userId: id }, include: Course });
    const courses = likes.map(like => like.course);

    res.status(200).json({ userId: id, courses });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.post("/likes", authMiddleware(), async (req, res) => {
  const { courseId } = req.body;
  const { id } = req.auth;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const likeExists = await Like.findOne({ where: { courseId, userId: id } });
    if (likeExists) return res.status(400).json({ message: "Curso já curtido." });

    const like = await Like.create({ courseId, userId: id });
    return res.status(201).json(like);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/likes", authMiddleware(), async (req, res) => {
  const { courseId } = req.body;
  const { id } = req.auth;
  try {
    const like = await Like.findOne({ where: { courseId, userId: id } });
    if (!like) return res.status(404).json({ message: "Like não encontrado." });

    await like.destroy();
    return res.status(200).json({ message: "Like deletado." });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;
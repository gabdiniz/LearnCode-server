const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const Favorite = require("../models/favorite");
const Course = require("../models/course");

const router = Router();

router.get("/favorites", authMiddleware(), async (req, res) => {
  const { id } = req.auth;
  try {
    const favorites = await Favorite.findAll({ where: { userId: id }, include: Course });
    const courses = favorites.map(favorite => favorite.course);

    return res.status(200).json({ userId: id, courses });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.post("/favorites", authMiddleware(), async (req, res) => {
  const { courseId } = req.body;
  const { id } = req.auth;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const favoriteExists = await Favorite.findOne({ where: { courseId, userId: id } });
    if (favoriteExists) return res.status(200).json({ message: "Curso já favoritado." });
    
    const favorite = await Favorite.create({ courseId, userId: id });
    return res.status(201).json(favorite);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/favorites", authMiddleware(), async (req, res) => {
  const { courseId } = req.body;
  const { id } = req.auth;
  try {
    const favorite = await Favorite.findOne({ where: { courseId, userId: id } });
    if (!favorite) return res.status(404).json({ message: "Favorito não encontrado." });

    await favorite.destroy();
    return res.status(200).json({ message: "Favorito deletado." });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
})


module.exports = router;


const { Router } = require("express");
const Episode = require("../models/episode");
const Course = require("../models/course");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/episodes", authMiddleware(), async (req, res) => {
  const { name, synopsis, order, video_url, thumbnail_url, seconds_long, courseId } = req.body;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const episode = await Episode.create({ name, synopsis, order, video_url, thumbnail_url, seconds_long, courseId });
    return res.status(201).json(episode);
  }
  catch (err) {
    return res.status(200).json({ message: "Ocorreu um erro." });
  }
});

router.put("/episodes/:id", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  const { name, synopsis, order, video_url, thumbnail_url, seconds_long, courseId } = req.body;
  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const episode = await Episode.findByPk(id);
    if (!episode) return res.status(404).json({ message: "Episodio não encontrado." });

    await episode.update({ name, synopsis, order, video_url, thumbnail_url, seconds_long, courseId });
    return res.status(200).json({ message: "Episodio editado." });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/episodes/:id", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) return res.status(404).json({ message: "Episodio não encontrado." });

    await episode.destroy();
    return res.status(200).json({ message: "Episodio deletado." });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;

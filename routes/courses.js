const { Router } = require("express");
const Course = require("../models/course");
const authMiddleware = require("../middlewares/auth.middleware");
const Category = require("../models/category");
const Like = require("../models/like");
const { fn, col, literal } = require("sequelize");
const Episode = require("../models/episode");

const router = Router();

router.get("/courses/featured", async (req, res) => {
  try {
    const courses = await Course.findAll({ where: { featured: true } });
    res.status(200).json(courses);
  }
  catch (err) {
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/courses/search", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const { count, rows } = await Course.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    const totalPages = Math.ceil(count / pageSize);
    const last = (rows.length < 10);
    return res.json({ courses: rows, page, pageSize, totalPages, totalCount: count, last });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/courses/popular", async (req, res) => {
  try {
    const likes = await Like.findAll({
      attributes: [[fn("COUNT", col('courseId')), "likes"]],
      group: ['courseId'],
      order: [[literal('likes'), 'DESC']],
      limit: 5,
      include: Course
    });
    res.status(200).json(likes);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/courses/:id", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.id;
  try {
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const episodes = await Episode.findAll({ where: {courseId: id}, order: [['order', 'ASC']]})

    const likeIsTrue = ((await Like.findOne({ where: { courseId: id, userId } }))) ? true : false;
    return res.status(200).json({ course, episodes, like: likeIsTrue });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.post("/courses", authMiddleware(), async (req, res) => {
  const { name, synopsis, thumbnail_url, featured, categoryId } = req.body;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada." });

    const course = await Course.create({ name, synopsis, thumbnail_url, featured, categoryId });
    return res.status(201).json(course);
  }
  catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/courses/:id", authMiddleware(), async (req, res) => {
  const { name, synopsis, thumbnail_url, featured, categoryId } = req.body;
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) return res.status(404).json({ message: "Curso não encontrado." });

    const category = await Category.findByPk(categoryId);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada." });

    await course.update({ name, synopsis, thumbnail_url, featured, categoryId });
    return res.status(200).json({ message: "Curso editado." });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/courses/:id", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (course) {
      await course.destroy();
      return res.status(200).json({ message: "Curso deletado." });
    }
    else {
      return res.status(404).json({ message: "Curso não encontrado." });
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;
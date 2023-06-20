const { Router } = require("express");
const Category = require("../models/category");
const authMiddleware = require("../middlewares/auth.middleware");
const Course = require("../models/course");

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll({ order: [['position', 'ASC']] });
    return res.status(200).json(categories);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Categoria não encontrada." });

    const courses = await Course.findAll({ where: { categoryId: id } });
    return res.status(200).json({ id: category.id, name: category.name, courses: courses });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.post("/categories", authMiddleware(), async (req, res) => {
  const { name, position } = req.body;
  try {
    const categoryPosition = await Category.findOne({ where: { position } });
    if (categoryPosition) return res.status(400).json({ message: "Já existe uma categoria com essa posição" });

    const category = await Category.create({ name, position });
    return res.status(201).json(category);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/categories/:id", authMiddleware(), async (req, res) => {
  const { name, position } = req.body;
  const { id } = req.params;
  try {
    const categoryPosition = await Category.findOne({ where: { position } });
    if (categoryPosition) return res.status(400).json({ message: "Já existe uma categoria com essa posição" });

    const category = await Category.findByPk(id);
    if (category) {
      await category.update({ name, position });
      return res.status(200).json({ message: "Categoria editada." });
    }
    else {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.delete("/categories/:id", authMiddleware(), async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return res.status(200).json({ message: "Categoria deletada." });
    }
    else {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;
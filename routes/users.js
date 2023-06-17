const User = require("../models/user");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/account", authMiddleware(), async (req, res) => {
  try {
    const user = await User.findByPk(req.auth.id);
    return res.status(200).json(user);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/account", authMiddleware(), async (req, res) => {
  const { first_name, last_name, phone, birth, email, } = req.body;
  try {
    const user = await User.findByPk(req.auth.id);
    await user.update({ first_name, last_name, phone, birth, email, });
    return res.json({ message: "Usuário editado com sucesso!" });
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;
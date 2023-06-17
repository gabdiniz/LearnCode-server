const User = require("../models/user");
const bycrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt/jwt.utils");

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone,
    birth,
    email,
    password,
    role,
  } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "E-mail já cadastrado" });

    const saltRounds = 10;
    const hashedPassword = await bycrypt.hash(password, saltRounds);

    const newUser = await User.create({
      first_name,
      last_name,
      phone,
      birth,
      email,
      password: hashedPassword,
      role
    });
    delete newUser.dataValues.password;
    return res.status(201).json(newUser);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuário não existe." });
    
    const correctPassword = await bycrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).json({ message: "Senha incorreta." });

    const token = generateToken(user);
    return res.status(200).json(token);
  }
  catch (err) {
    return res.status(500).json({ message: "Ocorreu um erro." });
  }
};

module.exports = { register, login };
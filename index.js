const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const routeAuth = require("./routes/auth.routes");
const routeUsers = require("./routes/users");
const routeCategories = require("./routes/categories");

app.use(routeAuth);
app.use(routeUsers);
app.use(routeCategories);


authenticate(connection);
connection.sync();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
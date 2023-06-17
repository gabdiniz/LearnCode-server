const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const routeAuth = require("./routes/auth.routes");

app.use(routeAuth);

authenticate(connection);
connection.sync();

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});
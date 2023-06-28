const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./config/database");
const routeAuth = require("./routes/auth.routes");
const routeUsers = require("./routes/users");
const routeCategories = require("./routes/categories");
const routeCourses = require("./routes/courses");
const routeFavorites = require("./routes/favorites");
const routeLikes = require("./routes/likes");
const routeEpisodes = require("./routes/episodes");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(routeAuth);
app.use(routeUsers);
app.use(routeCategories);
app.use(routeCourses);
app.use(routeFavorites);
app.use(routeLikes);
app.use(routeEpisodes);

authenticate(connection);
connection.sync();

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001/");
});
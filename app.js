require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/db");

const handleError = require("./middlewares/handleError");
const invalidUrlError = require("./middlewares/invalidUrlError");

const index = require("./routes/index");
const usersRouter = require("./routes/users");
const musicsRouter = require("./routes/musics");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", usersRouter);
app.use("/musics", musicsRouter);

app.use(invalidUrlError);
app.use(handleError);

module.exports = app;

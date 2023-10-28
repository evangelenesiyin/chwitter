require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("chwitter:server");
const checkToken = require("./config/checkToken");

//* Routers
const usersRouter = require("./routes/usersRouter");
const chweetRouter = require("./routes/chweetRouter");
const profileRouter = require("./routes/profileRouter");

//* App
const app = express();

//* Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
// Middleware to verify token and assign user object of payload to req.user.
app.use(checkToken);

//* Routes -> all routes to start with /api
app.use("/api/users", usersRouter);
app.use("/api/chweet", chweetRouter);
app.use("/api/profile", profileRouter);

//* Listener
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});

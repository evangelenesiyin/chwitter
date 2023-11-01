const mongoose = require("mongoose");
const debug = require("debug")("chwitter:config:database");

mongoose.set("debug", true);
console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

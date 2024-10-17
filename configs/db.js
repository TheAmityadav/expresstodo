const mongoose = require("mongoose");
const URI = "mongodb://127.0.0.1:27017/todo";

mongoose.connect(URI);
const db = mongoose.connection;
db.on("connected", () => {
  console.log("DB Connected Success");
});
db.on("Disconnected", () => {
  console.log("DB Disconnected Success");
});
db.on("error", (error) => {
  console.log(`Error Connecting DB ${error}`);
});
module.exports = db;

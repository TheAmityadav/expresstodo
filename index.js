const express = require("express");
const app = express();
const db = require("./configs/db");
const userAuthRoutes = require("./router/userAuthRoutes");
const todoRoutes = require("./router/todoRoutes");
app.use(express.json());
const PORT = 5000;
const { authenticateJWT } = require("./auth/usertokensuth");

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Welcome");
});

app.use("/api/auth", userAuthRoutes);
app.use("/api/todo", authenticateJWT, todoRoutes);

app.listen(PORT, () => {
  console.log(`Node Server Started on ${PORT}`);
});

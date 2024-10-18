const express = require("express");
const router = express.Router();
const {
  newTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.post("/newtodo", newTodo);
router.get("/getalltodo", getTodo);
router.delete("/deletetodo/:id", deleteTodo);
router.patch("/updatetodo/:id", updateTodo);

module.exports = router;

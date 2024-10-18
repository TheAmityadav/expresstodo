const todomodel = require("../models/todoModel");

const newTodo = async (req, res) => {
  try {
    const user_id = req.userId;
    console.log(req.body);
    const { title, description, status } = req.body;
    if (!title || !status) {
      return res.status(301).json({ message: "Titile or status Missing" });
    }
    const new_todo = await new todomodel({
      user_id: user_id,
      title: title,
      description: description,
      status: status,
    });
    const save_todo = await new_todo.save();
    res.status(200).json({ message: "Todo Saved", save_todo });
  } catch (error) {
    res.status(401).json({ message: `error creating todo ${error}` });
  }
};

const deleteTodo = async (req, res) => {
  try {
    console.log("delete todo called");
    const todo_id = req.params.id;
    const user_id = req.userId;
    console.log(todo_id);
    const todo = await todomodel.findById(todo_id);
    if (todo.user_id.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "Unauthorzied to delete this todo" });
    }
    const delete_todo = await todomodel.findByIdAndDelete(todo_id);
    res.status(200).json({ message: "Todo Delete Success", delete_todo });
  } catch (error) {
    res.status(401).json({ message: `error deleting todo ${error}` });
  }
};

const getTodo = async (req, res) => {
  try {
    const user_id = req.userId;
    const all_todos = await todomodel.find({ user_id });
    res.status(200).json({ all_todos });
  } catch (error) {
    res.status(401).json({ message: `error Fetching todos ${error}` });
  }
};

const updateTodo = async (req, res) => {
  try {
    const todo_id = req.params.id;
    const todo = await todomodel.findById(todo_id);
    if (todo.user_id.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "Unauthorzied to Update this todo" });
    }
    const { title, description, status } = req.body;
    const updated_todo = {
      title: title,
      description: description,
      status: status,
    };
    const update_todo = await todomodel.findByIdAndUpdate(
      todo_id,
      updated_todo,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Todo updated Success", update_todo });
  } catch (error) {
    res.status(401).json({ message: `error updating todos ${error}` });
  }
};

module.exports = { newTodo, deleteTodo, getTodo, updateTodo };

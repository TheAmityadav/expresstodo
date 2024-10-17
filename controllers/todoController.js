const newTodo = (req, res) => {
  const user_id = req.userId;
  const { title, description, status } = req.body;
};

const deleteTodo = (req, res) => {};

const getTodo = (req, res) => {};

const updateTodo = (req, res) => {};

module.exports = { newTodo, deleteTodo, getTodo, updateTodo };

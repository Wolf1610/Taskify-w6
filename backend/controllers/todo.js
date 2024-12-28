
const { Todo } = require('../db/index');

const todoPost = async (req, res) => {
    const createPayload = req.body;

    if (!createPayload.title) {
        return res.status(400).json({
            msg: "You sent the wrong inputs",
        });
    }

    try {
        // Save to MongoDB
        const newTodo = await Todo.create({
            title: createPayload.title,
            completed: false,
            userId: req.userId, 
        });

        res.status(201).json({
            msg: "Todo created",
            todo: newTodo, 
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating todo",
            error: error.message,
        });
    }
};

const todoGet = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });

        res.json({
            todos: todos,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching todos",
            error: error.message,
        });
    }
};

const todoPut = async (req, res) => {
    const { id } = req.params; 
    const updatePayload = req.body;

    // Basic input check
    if (typeof updatePayload.completed === 'undefined') {
        return res.status(400).json({
            msg: "You must provide a completed status.",
        });
    }

    try {
        const result = await Todo.updateOne(
            { _id: id }, 
            { completed: updatePayload.completed }
        );

        res.json({
            msg: "Todo marked as completed.",
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating todo.",
            error: error.message,
        });
    }
};

module.exports = {
    todoPost,
    todoGet,
    todoPut
}
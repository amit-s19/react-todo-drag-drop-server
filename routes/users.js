//Module Imports
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Todo = require('../models/todo');


router.post('/getUserName', async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).send(user);
        }
        return res.status(404).send("User not found!");
    } catch (err) {
        return res.status(422).send(err);
    }
});

router.post('/signup', async (req, res) => {
    const {
        fullName,
        email
    } = req.body;

    if (!fullName || !email) {
        return res.status(422).send({ error: "One of the mandatory fields is missing!" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).send({ error: "User already exists!" });
    }
    try {
        const newUser = new User({
            fullName: fullName,
            email: email
        });
        const savedNewUser = await newUser.save();
        res.status(201).send(savedNewUser);
    } catch (err) {
        return res.status(422).send(err.message)
    }
});

router.get('/getTodo', async (req, res) => {

    const todos = await Todo.findOne({});

    if (todos) {
        return res.status(200).send(todos.todos);
    }
    return res.status(404).send("No todos found!");
});

router.post('/addTodo', async (req, res) => {
    const {
        id,
        title,
        desc,
        status,
        createdBy,
        date
    } = req.body;

    if (!id || !title || !desc || !status || !createdBy || !date) {
        return res.status(422).send({ error: "One of the mandatory fields is missing!" });
    }

    const todo = {
        id: id,
        title: title,
        desc: desc,
        status: status,
        createdBy: createdBy,
        date: date
    }

    const existingTodo = await Todo.findOne({});

    if (existingTodo) {
        const updatedTodolist = await Todo.updateOne({}, {
            $addToSet: { todos: todo }
        })
        return res.status(200).send(updatedTodolist);
    }
    try {
        const newTodo = new Todo({
            todos: [todo]
        })
        const savedNewTodo = await newTodo.save();
        res.status(201).send(savedNewTodo);
    } catch (err) {
        return res.status(422).send(err.message)
    }
});

router.post('/removeTodo', async (req, res) => {
    const {
        id
    } = req.body;

    if (!id) {
        return res.status(422).send({ error: "One of the mandatory fields is missing!" });
    }

    const removeTodo = await Todo.updateOne({}, { $pull: { todos: { id: id } } });

    if (removeTodo) {
        return res.status(200).send(removeTodo);
    }

    return res.status(400).send("An error occured")

});

router.post('/dragTodo', async (req, res) => {
    const {
        id,
        status
    } = req.body;

    if (!id || !status) {
        return res.status(422).send({ error: "One of the mandatory fields is missing!" });
    }
    
    const dragTodo = await Todo.updateOne({"todos.id":id}, { $set: { "todos.$.status": status}});

    if (dragTodo) {
        return res.status(200).send(dragTodo);
    }
    return res.status(400).send("An error occured!");

});

// Exporting route
module.exports = router;
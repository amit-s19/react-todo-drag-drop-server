const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todos: [{
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
    }],
});

module.exports = mongoose.model('Todos', todoSchema);
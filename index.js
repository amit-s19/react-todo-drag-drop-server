// Module imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Setting constants
const PORT = process.env.PORT || 3000

// Instantiating express variable and enabling body parsing
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Importing routes
const usersRoute = require('./routes/users');

// Route middlewares
app.use('/api/users', usersRoute);

// Connecting to DB
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to DB!')
);


app.listen(PORT, () => {
    console.log("Server Running on port : " + PORT)
});
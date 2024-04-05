const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); //May need to implement or change this
const Project = require('./models/Project'); 

const app = express();

app.use(express.json());

//Connect to MongoDB
mongoose.connect('mongodb+srv://felipejofre:123@cluster0.8w3qgca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login', async (req, res) => {
    const { userID, password } = req.body;

    //Find the user in the database
    const user = await User.findOne({ userID, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid userID or password' });
    }

    // Find the projects that the user has joined
    const projects = await Project.find({ _id: { $in: user.projects } });

    // Return the user's projects
    return res.json({ projects });
});
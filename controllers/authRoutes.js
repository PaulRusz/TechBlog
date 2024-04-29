const express = require('express');
const { User } = require('../models');
const router = express.Router();

// GET route for user registration form
router.get('/register', (req, res) => {
    res.render('register', { loggedIn: req.session.loggedIn }); // Render the registration form view
});

// Registration route - handles the form submission
router.post('/register', async (req, res) => {
    try {
        // Extract user input from the registration form
        const { username, email, password } = req.body;

        // Validate user input (e.g., check for empty fields, validate email format)

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the user's password for security
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt or another hashing library

        // Create a new user record in the database
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword // Store the hashed password in the database
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});


// Login route - render the login form
router.get('/login', (req, res) =>{
    res.render('login', { loggedIn: req.session.loggedIn 
    })
})


// POST route for user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData || !userData.checkPassword(req.body.password)) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.status(200).json({ user: userData, message: 'Login successful' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to login' });
    }
});

// POST route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
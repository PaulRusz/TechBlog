const express = require('express').Router();
const { User } = require('../../models');
const router = require('express').Router();


// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.user_id
            req.session.loggedIn = true

            res.json({ userData: userData, message: 'You are now signed in!' })
        })
    } catch (err) {
        res.status(400).json(err)
    }
})


// User login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } })

        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400)
            .json({ message: 'Incorrect password, please try again'})
            return
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true
            res.json({ userData: userData, message: 'You are now logged in!' })
        });

    } catch (err) {
        console.log("Login err",err);
        res.status(400).json(err)
    }
})


// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }
})


module.exports = router;


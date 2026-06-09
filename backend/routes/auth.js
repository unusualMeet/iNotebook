    const express = require('express');
    const User = require('../models/User');

    const router = express.Router();

    router.post('/', async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });

    module.exports = router;
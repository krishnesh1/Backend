const express = require('express');
const router = express.Router();
const users = require('../data/usersData');

// GET /users - return all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id - return a user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (user) res.json(user);
    else res.status(404).json({ error: "User not found" });
});

module.exports = router;

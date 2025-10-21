const express = require('express');
const app = express();

// Import the users route
const userRoutes = require('./routes/users');

// Mount it under /api/users
app.use('/api/users', userRoutes);

app.listen(1000, () => {
    console.log("Server started on port 1000");
});

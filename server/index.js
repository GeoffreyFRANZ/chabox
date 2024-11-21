const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController"); // Adjust the path as required

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { // Replace 'yourDatabaseName' with your actual database name
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB connected...');
        // Start the Express server only after successful MongoDB connection
        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with an error code if MongoDB connection fails
    });

// Define your routes
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await userController.listUsers(req.query.name);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
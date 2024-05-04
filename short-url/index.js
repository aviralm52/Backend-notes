const express = require("express");
const app = express();
const PORT = 8000;

const { connectMongoDB } = require("./connection");
const urlRoutes = require("./routes/userRoutes");
const URL = require("./model/userModel");

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/URLshortener")
    .then(() => console.log("MongoDB connected!!"))
    .catch((err) => console.log("Error: ", err));

// Middleware to read json data from body
app.use(express.json());

// Route
app.use("/url", urlRoutes);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

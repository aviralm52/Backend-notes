const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");

const { connectMongoDB } = require("./connection");
const urlRoutes = require("./routes/userRoutes");
const URL = require("./model/userModel");
const staticRoutes = require("./routes/staticRoutes");

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/URLshortener")
    .then(() => console.log("MongoDB connected!!"))
    .catch((err) => console.log("Error: ", err));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to read form data
app.use(express.urlencoded({ extended: false }));
// Middleware to read json data from body
app.use(express.json());

// Route
app.use("/", staticRoutes);
app.use("/url", urlRoutes);


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

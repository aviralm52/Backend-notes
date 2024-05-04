const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectMongoDB } = require("./connection");
const { URL } = require("./model/userModel");
const urlRoutes = require("./routes/userRoutes");
const staticRoutes = require("./routes/staticRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const { restrictToLoggedInUserOnly } = require("./middleware/auth");

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/AuthCheck")
    .then(() => console.log("MongoDB connected!!"))
    .catch((err) => console.log("Error: ", err));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware to read form data
app.use(express.urlencoded({ extended: false }));
// Middleware to read json data from body
app.use(express.json());
// Middleware to read cookies
app.use(cookieParser());

// Route
app.use("/", staticRoutes);  
app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/signup", signupRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

// restrictToLoggedInUserOnly
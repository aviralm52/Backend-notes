const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

//! '/users' return html page - this is just for demo generally we return only json data
app.get("/users", async (req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <ul>
        ${allDBusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join(" ")}
    </ul>
    `;
    return res.send(html);
});

//Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/LearningNode")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error: ", err));

// SCHEMA
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobTitle: {
            type: String,
        },
        gender: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//TODO: ROUTES
app.get("/", (req, res) => {
    return res.send("Home Page");
});
app.get("/api/users", async (req, res) => {
    const allDBusers = await User.find({});
    return res.send(allDBusers);
});
app.get("/api/users/:id", async (req, res) => {
    try {
        const selectedUser = User.findById(req.params.id);
        if (!selectedUser)
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        return res.send(selectedUser);
    } catch (err) {
        console.log("Invalid Id size");
        console.log("Error: ", err);
    }
});


app.use(express.urlencoded({ extended: false }));
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res
            .status(400)
            .json({ status: "failed", message: "All fields are required" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("Result: ", result);
    return res.status(201).json({
        status: "success",
        message: "New User added with id: " + result._id,
    });
});


app.patch("/api/users/:id", async (req, res) => {
    const body = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        } else {
            await User.findByIdAndUpdate(req.params.id, {
                firstName: body.first_name,
                lastName: body.last_name,
                email: body.email,
                gender: body.gender,
                jobTitle: body.job_title,
            });
            return res.json({
                status: "success",
                "user updated with id: ": req.params.id,
            });
        }
    } catch (err) {
        console.error("Error(Only 24 chars. id is valid) ", err);
        return res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
    }
});


app.delete("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "User not found" });
        }
        await User.findByIdAndDelete(req.params.id);
        return res.json({
            status: "success",
            "User deleted with id: ": req.params.id,
        });
    } catch (err) {
        console.log("Error: ", err);
    }
});

// app.post("/api/users/:id", (req, res) => {});
// app.patch("/api/users/:id", (req, res) => {});
// app.delete("/api/users/:id", (req, res) => {});
// //! if we have multiple requests for same path then we can combine all of them in one
// app.route("/api/users/:id")
//     .get((req, res) => {})
//     .post((req, res) => {})
//     .patch((req, res) => {})
//     .delete((req, res) => {});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

//* MIDDLEWARES acts as a middle agent, they can perfrom in-between operations on the request and response objects
//* the request from client goes to middlewares and then to server
//* the request can be rejected from middleware or can be passed to server
//* they have access to request and response object along with next iterator which will call the next middleware if present
//* otherwise call the route for which the request is intended
//* next method in middleware calls the next middleware based on which middleware is written after that middleware,
//* next works on position of middleware in the code, the middleware written first will be called first and then next will be called
//* we can also create middleware separately and pass it in any route
// const middleware = (req, res, next) => {
//     console.log('Hello from middleware');
//     next();
// }
// app.get("/api/users", middleware, (req, res) => {
//     return res.send(users);
// });

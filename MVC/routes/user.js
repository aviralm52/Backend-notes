const express = require('express');
const router = express.Router();


//TODO: ROUTES
router.get("/", (req, res) => {
    return res.send("Home Page");
});
app.get("/users", async (req, res) => {
    const allDBusers = await User.find({});
    const html = `
    <ul>
        ${allDBusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join(" ")}
    </ul>
    `;
    return res.send(html);
});
router.get("/api/users", async (req, res) => {
    const allDBusers = await User.find({});
    return res.send(allDBusers);
});
router.get("/api/users/:id", async (req, res) => {
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


router.post("/api/users", async (req, res) => {
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


router.patch("/api/users/:id", async (req, res) => {
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


router.delete("/api/users/:id", async (req, res) => {
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

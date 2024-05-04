const express = require("express");
const fs = require("fs");
let users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//! '/users' return html page - this is just for demo generally we return only json data
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join(" ")}
    </ul>
    `;
    return res.send(html);
});

//TODO: Middleware  --   used when we use post request and express does not know which kind of data is it
app.use((req, res, next) => {
    req.addedVariable = "added in middleware";
    console.log("Hello from middleware 2");
    next();
});
app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    console.log("passed from prev. middleware: ", req.addedVariable);
    next();
});
app.use(express.urlencoded({ extended: false }));

//TODO: ROUTES
app.get("/", (req, res) => {
    return res.send("Home Page");
});

//! 'api/users' is the path which indicates that we have to return json data
app.get("/api/users", (req, res) => {
    return res.send(users);
});

//! DYNAMIC path parameters
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const selectedUser = users.find((user) => user.id == id);
    if (!selectedUser) return res.status(404).json({status: 'failed', message: 'User not found'});
    return res.send(selectedUser);
});

app.post("/api/users", (req, res) => {
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
    users.push({
        ...body,
        id: users.length + 1,
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        console.log("User added with id: ", users.length);
        return res.json({ status: "success", id: users.length });
    });
}); //! here data in body will be undefined if we don't use middleware as express does not know which kind of data is it, so we use a middleware
//! here we had also used status code 400 which shows bad request

app.patch("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res
            .status(404)
            .json({ status: "failed", message: "User not found" });
    } else {
        user.first_name = body.first_name;
        user.last_name = body.last_name;
        user.email = body.email;
        user.gender = body.gender;
        user.job_title = body.job_title;
    }
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        console.log("Error: ", err);
        return res.json({ status: "success", "user updated with id: ": id });
    });
});

app.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    console.log("id: ", id, typeof id);
    users = users.filter((user) => user.id != id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        res.json({ status: "success", "User deleted with id: ": id });
    });
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

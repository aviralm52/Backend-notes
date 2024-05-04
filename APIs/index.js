const express = require("express");
const fs = require('fs')
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
app.use(express.urlencoded({extended: false}))  //! it is a middleware thet checks the header type of request and parse the data only if content type matches with url-encoded


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
    return res.send(selectedUser);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({
        ...body, id : users.length+1
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        console.log('User added with id: ', users.length);
        return res.json({status: 'success', id : users.length})
    })
})  //! here data in body will be undefined if we don't use middleware as express does not know which kind of data is it, so we use a middleware

app.patch('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    users.forEach((user) => {
        if (user.id == id){
            user.first_name = body.first_name;
            user.last_name = body.last_name;
            user.email = body.email;
            user.gender = body.gender;
            user.job_title = body.job_title;
        }
    })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        console.log('Error: ', err)
        return res.json({status: 'success', 'user updated with id: ' : id})
    })
})

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("id: ", id, typeof id)
    users = users.filter((user) => user.id != id );
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        res.json({status: 'success', 'User deleted with id: ' : id})
    })
})





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

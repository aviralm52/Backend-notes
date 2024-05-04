const http = require("http");
const express = require("express");

const app = express();

// function myHandler (res, req) {
//     const date = Date.now();
//     const currDate = new Date(date);
//     const url = require('url')      //! this is not a builtin package and we have to install it

//     const myUrl = url.parse(req.url, true);     //! 'true' means it will also parse query parameters
//     console.log("myUrl: ",myUrl)

//     const log = `${currDate.toISOString().split("T")[0]} ${currDate.toTimeString()} ${req.url} ${req.method}: New Req. recieved \n`;

//     fs.appendFile("log.txt", log, (err, data) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 res.end("Home Page");
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ${username}`);
//                 break;
//             default:
//                 res.end("Page not found");
//         }
//     });
// }

app.get("/", (req, res) => {
    return res.send("Hello from Home Page");
});
app.get("/about", (req, res) => {
    if (req.query.myname && req.query.userid)
        return res.send(
            "Hello from about page" +
                " Hey " +
                req.query.myname +
                " userId: " +
                req.query.userid
        );
    else return res.send("Hello from about page");
});

// const myServer = http.createServer(app)
// myServer.listen(5000, () => console.log("Server running on port 5000"));

app.listen(5000, () => console.log("Server running on port 5000"));

//TODO: Https methods - GET, POST, PUT, PATCH, DELETE
//* as https has many methods so it will be a very hectic task to use if-else to check each method and that's why we use express

//* This whole myHandler function is replaced with express
//* In express if we use query parameters then also it will go to same path
//* express also removes the requirement of http module and creating server

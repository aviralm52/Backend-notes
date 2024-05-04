const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
    const date = Date.now();
    const currDate = new Date(date);
    const url = require('url')      //! this is not a builtin package and we have to install it

    const myUrl = url.parse(req.url, true);     //! 'true' means it will also parse query parameters
    console.log("myUrl: ",myUrl) 

    const log = `${currDate.toISOString().split("T")[0]} ${currDate.toTimeString()} ${req.url} ${req.method}: New Req. recieved \n`;

    fs.appendFile("log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case "/":
                res.send("Home Page");
                break;
            case "/about":
                const username = myUrl.query.myname;
                res.send(`Hi ${username}`);
                break;
            default:
                res.send("Page not found");
        }
    });
});

myServer.listen(5000, () => console.log("Server running on port 5000"));




//TODO: Https methods - GET, POST, PUT, PATCH, DELETE
//* as https has many methods so it will be a very hectic task to use if-else to check each method and that's why we use express

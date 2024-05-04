const express = require("express");
const router = express.Router();
const { URL } = require("../model/userModel");
const { getUser } = require("../service/auth");

router.get("/", async (req, res) => {
    // console.log('req: -> ', req.user);
    const sessionId = req.cookies?.sessionId;
    // console.log("sessionId frpm static: ", sessionId);
    const user = getUser(sessionId);
    // console.log("user from static: ", user);
    // let renderURLs = await URL.find();
    let renderURLs = [];
    try {
        renderURLs = await URL.find({ createdBy: user._id });
    } catch (err) {
        // const allURLs = await URL.find();
        console.log('error in finding the user')
        // console.log(err);
        
    }
    // console.log('render URLs: ', renderURLs);
    return res.render("home", { urls: renderURLs });
});

module.exports = router;

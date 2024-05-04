const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const { URL, USER } = require("../model/userModel");
const { setUser } = require("../service/auth");

async function generateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    const shortId = shortid();
    await URL.create({
        shortId,
        redirectURl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    // console.log("url created");

    // return res.json({ ID: shortId });
    return res.render("home", { ID: shortId });
}

async function getAnalytics(req, res) {
    // console.log("req.params: ", req.params);
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId: shortId });
    return res.json({
        "Total Clicks": entry.visitHistory.length,
        "Visit History": entry.visitHistory,
    });
}

async function monitorClicks(req, res) {
    const shortid = req.params.shortid;
    const date = new Date(Date.now());
    const entryDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortid },
        { $push: { visitHistory: { timeStamp: entryDate } } }
    );
    res.redirect(entry.redirectURl);
}

async function handleSignUp(req, res) {
    const body = req.body;
    const entry = await USER.create({
        name: body.name,
        email: body.email,
        password: body.password,
    });
    res.redirect("/");
}

async function handleLogin(req, res) {
    // console.log("handleLogin");
    const { email, password } = req.body;
    const user = await USER.findOne({ email, password });
    if (!user) {
        // console.log("login page rendered");
        return res.render("login");
    }
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    res.redirect("/");
}

module.exports = {
    generateShortUrl,
    getAnalytics,
    monitorClicks,
    handleSignUp,
    handleLogin,
};

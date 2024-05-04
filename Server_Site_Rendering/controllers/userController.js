const shortid = require("shortid");
const URL = require("../model/userModel");

async function generateShortUrl(req, res) {
    const body = req.body;
    console.log("body: ", body);
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    const shortId = shortid();

    await URL.create({
        shortId,
        redirectURl: body.url,
        visitHistory: [],
    });

    // return res.json({ ID: shortId });
    return res.render("home", { ID: shortId });
}

async function getAnalytics(req, res) {
    console.log("req.params: ", req.params);
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

module.exports = { generateShortUrl, getAnalytics, monitorClicks };

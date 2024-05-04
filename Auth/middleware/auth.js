const { getUser } = require("../service/auth");

function restrictToLoggedInUserOnly(req, res, next) {
    const sessionId = req.cookies?.sessionId;
    console.log("sessionId: ", sessionId);

    if (!sessionId) {
        // console.log("session id not found");
        res.redirect("/login");
    } else {
        const user = getUser(sessionId);
        // console.log('user: ', user);
        if (!user) {
            console.log("user not found");
        }
        // console.log("outside loop");
        req.user = user;
        next();
    }
}

module.exports = {
    restrictToLoggedInUserOnly,
};

const jwt = require("jsonwebtoken");
const SECRET_TOKEN_KEY = "{Aviral$7704}";

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    const payload = {
        _id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, SECRET_TOKEN_KEY);
}

function getUser(token) {
    // return sessionIdToUserMap.get(id);
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET_TOKEN_KEY);
    } catch (err) {
        return res.json({ error: "Invalid token" });
    }
}

module.exports = {
    setUser,
    getUser,
};

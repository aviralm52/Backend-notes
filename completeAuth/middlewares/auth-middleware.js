import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            // get token from header
            token = authorization.split(" ")[1];

            // verify token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // get user form token
            req.user = await userModel.findById(userID).select("-password");
            next();
        } catch (error) {
            return res.status(401).send({ message: "Invalid token" });
        }
    }
    if (!token) {
        res.status(401).send({ message: "No token" });
    }
};

export default checkUserAuth;

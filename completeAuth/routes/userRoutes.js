import express from "express";
const router = express.Router();
import {
    userRegistration,
    userLogin,
    changeUserPassword,
    loggedUser,
    sendPasswordResetLink,
    resetUserPassword,
} from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js"; // middleware to protect unauthorized access


// router level middleware - to protect route
router.use("/changePassword", checkUserAuth);
router.use("/loggedUser", checkUserAuth);


// public routes
router.post("/register", (req, res) => {
    userRegistration(req, res);
});
router.post("/login", (req, res) => {
    userLogin(req, res);
});
router.post("/send-reset-password-email", (req, res) => {
    sendPasswordResetLink(req, res);
});
router.post('/reset-password/:id/:token', (req, res) => {
    resetUserPassword(req, res);
})


//protected routes
router.post("/changePassword", (req, res) => {
    changeUserPassword(req, res);
});
router.get("/loggedUser", (req, res) => {
    loggedUser(req, res);
});


export default router;

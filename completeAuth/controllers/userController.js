import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../config/emailConfig.js";

// registration
const userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.send({ status: "failed", message: "Email already exists" });
    } else {
        if (name && email && password && password_confirmation && tc) {
            if (password === password_confirmation) {
                try {
                    // hashing password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    await userModel.create({
                        name,
                        email,
                        password: hashedPassword,
                        tc,
                    });

                    // fetching current user
                    const saved_user = await userModel.findOne({
                        email: email,
                    });

                    // generate JWT token
                    const token = jwt.sign(
                        { userID: saved_user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "30m" }
                    );

                    res.status(201).send({
                        status: "ok",
                        message: "User created successfully",
                        token: token,
                    });
                } catch (error) {
                    console.log("error: ", error);
                }
            } else {
                res.send({
                    status: "failed",
                    message: "Password and password confirmation do not match",
                });
            }
        } else {
            res.send({ status: "failed", message: "All fields are required" });
        }
    }
};

// login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email: email });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (user.email === email && isMatch) {
                    // generate JWT token
                    const token = jwt.sign(
                        { userID: user._id },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: "5m" }
                    );

                    res.send({
                        status: "success",
                        message: "Login successful",
                        token: token,
                    });
                } else {
                    res.send({
                        status: "failed",
                        message: "Invalid credentials",
                    });
                }
            } else {
                res.send({ status: "failed", message: "User does not exist" });
            }
        } else {
            res.send({ status: "failed", message: "All fields are required" });
        }
    } catch (error) {
        console.log("error: ", error);
    }
};

// change password
const changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (oldPassword && newPassword && confirmPassword) {
        const user = await userModel.findById(req.user._id);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            if (newPassword === confirmPassword) {
                // change password
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(newPassword, salt);
                await userModel.findByIdAndUpdate(req.user._id, {
                    $set: { password: newHashPassword },
                });
                res.send({
                    status: "success",
                    message: "Password changed successfully",
                });
            } else {
                res.send({
                    status: "failed",
                    message: "Password and password confirmation do not match",
                });
            }
        } else {
            res.send({ status: "failed", message: "Incorrect Password" });
        }
    } else {
        res.send({ status: "failed", message: "All fields are required" });
    }
};

// show logged in user data
const loggedUser = async (req, res) => {
    res.send({ user: req.user });
};

// send email to the user with password reset link
const sendPasswordResetLink = async (req, res) => {
    const { email } = req.body;
    if (email) {
        const user = await userModel.findOne({ email: email });
        if (user) {
            const secret = user._id + process.env.JWT_SECRET_KEY;
            const token = jwt.sign({ userID: user._id }, secret, {
                expiresIn: "15m",
            });
            const resetLink = `http://localhost:5173/api/user/reset/${user._id}/${token}`;

            //! send Email
            let info = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: user.email,
                subject: "Password Reset Request",
                html: `<a href=${resetLink}>Click Here</a> to reset your password`
            })

            res.send({
                status: "success",
                message: "Email sent! please check Your email",
                info: info
            });
        } else {
            res.send({ status: "failed", message: "User does not exist" });
        }
    } else {
        res.send({ status: "failed", message: "Email is required" });
    }
};

// reset user password on clicking the link
const resetUserPassword = async (req, res) => {
    const {newPassword, confirmPassword} = req.body;
    const {id, token} = req.params;
    const user = await userModel.findById(id);
    const new_secret_key = user._id + process.env.JWT_SECRET_KEY;
    try {
        jwt.verify(token, new_secret_key);
        if (newPassword && confirmPassword){
            if (newPassword === confirmPassword){
                const salt = await bcrypt.genSalt(10);
                const newHashPassword = await bcrypt.hash(newPassword, salt);
                await userModel.findByIdAndUpdate(user._id, {
                    $set: { password: newHashPassword },
                });
                res.send({status: "success", message: "Password changed successfully"});
            }else{
                res.send({status: "failed", message: "Password and password confirmation do not match"});
            }
        }else{
            res.send({status: "failed", message: "All fields are required"});
        }
    } catch (error) {
        console.log(error);
        res.send({status: "failed", message: "Invalid token"});
    }
}

export {
    userRegistration,
    userLogin,
    changeUserPassword,
    loggedUser,
    sendPasswordResetLink,
    resetUserPassword
};

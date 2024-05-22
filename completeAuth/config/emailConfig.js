import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        // user: process.env.EMAIL_USER,     // Sender's gmail id
        // pass: process.env.EMAIL_PASSWORD,   // Sender's gmail password
        user: 'aviralm52@gmail.com',
        pass: 'scgtrwmkbazjzqmc'
    },
});


export default transporter;
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURl: {
            type: String,
            required: true,
        },
        visitHistory: [
            {
                timeStamp: {
                    type: String,
                },
            },
        ],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'signups',
        },
    },
    { timestamps: true }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
const USER = mongoose.model("signup", userSchema);

module.exports = {
    URL,
    USER,
};

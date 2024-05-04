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
    },
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;

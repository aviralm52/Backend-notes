const express = require('express');
const router = express.Router();
const URL = require('../model/userModel')

router.get('/', async(req, res) => {
    const allURLs = await URL.find();
    return res.render("home", { urls: allURLs });
})

module.exports = router;
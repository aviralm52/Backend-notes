const express = require("express");
const router = express.Router();
const {handleLogin} = require('../controllers/userController')


//handling login post request
router.get('/', async(req, res) => {
    // console.log('login Routes login get request');
    return res.render('login')
})

router.post('/', handleLogin);

module.exports = router;
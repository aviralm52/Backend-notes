const express = require("express");
const router = express.Router();
const {handleSignUp, handleLogin} = require('../controllers/userController')

router.get('/', async(req, res) => {
    return res.render('signup')
});

// handling signup post request
router.post('/', handleSignUp);

// //handling login post request
// router.get('/login', async(req, res) => {
//     console.log('signup Routes login get request');
//     return res.render('login')
// })
// router.post('/login', handleLogin)

module.exports = router;
const express = require("express");
const router = express.Router();


const {checkUserExist,newUserSignUp} = require('../controllers/SignUpPage')

router.post(newUserSignUp)
router.get(checkUserExist)


module.exports = router
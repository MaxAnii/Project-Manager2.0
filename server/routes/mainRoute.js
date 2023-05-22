const express = require("express");
const router = express.Router();

// const addNewUser = require('../controllers/SignUpPage')

// router.post('/signUp/:type',addNewUser)
const checkUserExist = require("../controllers/SignUpPage")

router.get('/signUp/:type',checkUserExist)

module.exports = router;
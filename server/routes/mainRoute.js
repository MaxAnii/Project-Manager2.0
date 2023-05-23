const express = require("express");
const router = express.Router();


// const loginSignupRoute = require('./loginSignupRoute')
// app.use('/signUp/:type',loginSignupRoute )
const {checkUserDetailsAlreadyExist,newUserSignUp,login} = require('../controllers/SignUpPage')
 const addMember = require('../controllers/addNewMember')
const getDashBoardInformation = require('../controllers/getData')


router.get('/signUp/',checkUserDetailsAlreadyExist)
router.post('/signUp',newUserSignUp)
router.get('/login/:collegeCode/:email/:password/:designation',login)
router.post('/addNewMember/:type',addMember)
router.get('/getInformationDashBoard/:type/:collegeCode/:dname?',getDashBoardInformation)
module.exports = router;
const express = require("express");
const router = express.Router();


// const loginSignupRoute = require('./loginSignupRoute')
const {checkUserExist,newUserSignUp} = require('../controllers/SignUpPage')
 const addMember = require('../controllers/addNewMember')
const getDashBoardInformation = require('../controllers/getData')

router.get('/signUp/',checkUserExist)
router.post('/signUp',newUserSignUp)
// app.use('/signUp/:type',loginSignupRoute )
router.post('/addNewMember/:type',addMember)
router.get('/getInformationDashBoard/:type/:collegeCode',getDashBoardInformation)
module.exports = router;
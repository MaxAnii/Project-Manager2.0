const express = require("express");
const router = express.Router();



const {checkUserDetailsAlreadyExist,newUserSignUp,login,departmentListAndCollegeName} = require('../controllers/SignUpPage')
 const addMember = require('../controllers/addNewMember')
const {getDashBoardInformation,getMentorList,getProjectMemberList} = require('../controllers/getData')
const {addNewProject,getProjectList,getMembertList} = require('../controllers/projectAPI')

router.get('/signUp/',checkUserDetailsAlreadyExist)
router.post('/signUp',newUserSignUp)
router.get('/getDepartmentList/collegeName/:collegeCode',departmentListAndCollegeName);

router.get('/login/:collegeCode/:email/:password/:designation',login)
router.post('/addNewMember/:type',addMember)
router.get('/getInformationDashBoard/:type/:collegeCode/:dname?',getDashBoardInformation)
router.get('/getProjectMentorList/:type/:collegeCode/:dname?',getMentorList)
router.get('/getProjectMemberList/:type/:collegeCode/:dname?',getProjectMemberList)
 router.post('/addNewProject/:type',addNewProject)
 router.get('/getprojectlist/:type/:id',getProjectList)
 router.get('/getmemberlist/:type/:id',getMembertList)

module.exports = router;
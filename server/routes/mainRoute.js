const express = require("express");
const router = express.Router();



const {checkUserDetailsAlreadyExist,newUserSignUp,login,departmentListAndCollegeName} = require('../controllers/SignUpPage')
 const addMember = require('../controllers/addNewMember')
const {getDashBoardInformation,getMentorList,getProjectMemberList} = require('../controllers/getData')
const {addNewProject,getProjectList,getMembertList, updateProjectStatus,deleteProject} = require('../controllers/projectAPI')
const updateAddedUserInformation = require('../controllers/UpdateInformation')
router.get('/signUp/',checkUserDetailsAlreadyExist)
router.post('/signUp',newUserSignUp)
router.get('/getDepartmentList/collegeName/:collegeCode',departmentListAndCollegeName);
router.get('/login/:collegeCode/:email/:password/:designation',login)
router.post('/addNewMember/:type',addMember)
router.get('/getInformationDashBoard/:type/:collegeCode/:dname?',getDashBoardInformation)
router.get('/getProjectMentorList/:type/:collegeCode/:dname?',getMentorList)
router.get('/getProjectMemberList/:type/:collegeCode/:dname?',getProjectMemberList)
router.post('/addNewProject/:type',addNewProject)
router.get('/getprojectlist/:type/:id/:dname?',getProjectList)
router.get('/getmemberlist/:id',getMembertList)
router.put('/updateprojectstatus/:type',updateProjectStatus)
router.delete('/deleteproject/:id',deleteProject)
router.put('/updateaddeduserinfo/:type',updateAddedUserInformation)


module.exports = router;
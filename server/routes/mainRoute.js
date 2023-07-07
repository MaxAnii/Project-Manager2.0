const express = require("express");
const router = express.Router();
const verifyjwt = require("../middlewear/verifyToken");

const {
  checkUserDetailsAlreadyExist,
  newUserSignUp,
  login,
  departmentListAndCollegeName,
} = require("../controllers/SignUpPage");
const addMember = require("../controllers/addNewMember");
const {
  getDashBoardInformation,
  getMentorList,
  getProjectMemberList,
  getPersonalInformation,
} = require("../controllers/getData");
const {
  addNewProject,
  getProjectList,
  getMembertList,
  updateProjectStatus,
  deleteProject,
} = require("../controllers/projectAPI");
const {
  updateAddedUserInformation,
  updatePersonalInformation,
  updatePassword,
} = require("../controllers/UpdateInformation");
const { forgetPasswordMail } = require("../controllers/MailVerification");
const {
  uploadReport,
  getReportList,
  setReportDetails,
  getReportDetails,
  deleteReport,
} = require("../controllers/projectReport");
const { upload } = require("../config/s3");

router.get(
  "/checkuserdetialsexits/:cc/:email/:type",
  checkUserDetailsAlreadyExist
);
router.post("/signUp", newUserSignUp);
router.get(
  "/getDepartmentList/collegeName/:collegeCode",
  departmentListAndCollegeName
);
router.post("/login", login);

router.post("/addNewMember/:type", verifyjwt, addMember);
router.get(
  "/getInformationDashBoard/:type/:collegeCode/:dname?",
  verifyjwt,
  getDashBoardInformation
);
router.get(
  "/getProjectMentorList/:type/:collegeCode/:dname?",
  verifyjwt,
  getMentorList
);
router.get(
  "/getProjectMemberList/:type/:collegeCode/:dname?",
  verifyjwt,
  getProjectMemberList
);
router.post("/addNewProject/:type", verifyjwt, addNewProject);
router.get("/getprojectlist/:type/:id/:dname?", verifyjwt, getProjectList);
router.get("/getmemberlist/:id", verifyjwt, getMembertList);
router.put("/updateprojectstatus/:type", verifyjwt, updateProjectStatus);
router.delete("/deleteproject/:id", verifyjwt, deleteProject);
router.put("/updateaddeduserinfo/:type", verifyjwt, updateAddedUserInformation);
router.get(
  "/getpersonalinformation/:type/:id",
  verifyjwt,
  getPersonalInformation
);
router.put(
  "/updatepersonalinformation/:type",
  verifyjwt,
  updatePersonalInformation
);

router.post("/getforgotpasswordemail", forgetPasswordMail);
router.post("/updateyourpassword", updatePassword);

router.post("/uploadreportdetails", verifyjwt, setReportDetails);
router.get("/getreportdetails/:projectId", verifyjwt, getReportDetails);
router.post("/uploadreport/:reportId", upload.single("files"), uploadReport);
router.get("/getprojectreportlist/:fileName", getReportList);
router.delete("/deletereport/:reportId", verifyjwt, deleteReport);

module.exports = router;

import express from "express";
import {
  addNewAdmin,
//   addNewDoctor,
//   getAllDoctors,
  getUserDetails,

  login,
  logoutAdmin,
  logoutstudent,
  studentRegister,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/student/register", studentRegister);
router.post("/student/login", login);
router.post("/admin/login", login);

router.post("/admin/addnew",
   isAdminAuthenticated,
   
   addNewAdmin);
// router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
// router.get("/doctors", getAllDoctors);
router.get("/student/me",  isStudentAuthenticated, getUserDetails);


// router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/logout",   isStudentAuthenticated, logoutstudent);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;

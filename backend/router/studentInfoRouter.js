import express from "express";
import {
  deleteStudentInfo,
  getAllStudentInfo,
  postStudentInfo ,
  updateStudentInfo,
} from "../controller/studentInfo.Controller.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isStudentAuthenticated, postStudentInfo );
router.get("/getall", isAdminAuthenticated, getAllStudentInfo);
router.put("/update/:id", isAdminAuthenticated, updateStudentInfo);
router.delete("/delete/:id", isAdminAuthenticated, deleteStudentInfo);

export default router;

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { StudentInfo } from "../models/studentInfoSchema.js";
import { User } from "../models/userSchema.js";
import cloudinary from "cloudinary";


export const postStudentInfo = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("income ducument  Required!", 400));
      }
      const { incomedocAvatar } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(incomedocAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
      }
  const {
    firstName,
    lastName,
    email,
    phone,
    gender,
  
    } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
 
    !gender ||

   
    !incomedocAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }


  const studentId = req.user._id;
  let user = await StudentInfo.findOne({email});
  if (user) {
    return next(new ErrorHandler("User already submited their info", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    incomedocAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
     return next(
      new ErrorHandler("Failed To Upload income To Cloudinary", 500)
    );
  } 
  const studentinfo = await StudentInfo.create({
    firstName,
    lastName,
    email,
    phone,
    gender,
    studentId,
    incomedocAvatar:{
    public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
   },  
  });
  res.status(200).json({
    success: true,
    studentinfo,
    message: "StudentInfo Send!",
  });


});


 






export const getAllStudentInfo= catchAsyncErrors(async (req, res, next) => {
  const studentInfo = await StudentInfo.find();
  res.status(200).json({
    success: true,
    studentInfo,
  });
});
export const updateStudentInfo= catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let studentinfo = await StudentInfo.findById(id);
    if (!studentinfo) {
      return next(new ErrorHandler("StudentInfo not found!", 404));
    }
    studentinfo = await StudentInfo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "StudentInfo Status Updated!",
    });
  }
);
export const deleteStudentInfo= catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const studentinfo = await StudentInfo.findById(id);
  if (!studentinfo) {
    return next(new ErrorHandler("StudentInfo Not Found!", 404));
  }
  await studentinfo.deleteOne();
  res.status(200).json({
    success: true,
    message: "StudentInfo Deleted!",
  });
});

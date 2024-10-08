import { Message } from "../models/messagesSchema.js"
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"

export const sendMessage =catchAsyncErrors( async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {

    // different way of writing error 
    // return res.status(400).json({
    //     success:false,
    //     message:"fill full form",
    // })

    return next(new ErrorHandler("Please fill fom full form", 400)) ;
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true, 
    message: "Message Send! Successfully",
  });
});



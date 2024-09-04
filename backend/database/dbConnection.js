import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"SCHOLARSHIP_MANAGEMENT_SYSTEM"
    }).then(()=>{
        console.log("connected to DATABASE");
    }).catch((error)=>{
        console.log(`Some error occured during connecting the database ${error}`);
    })

}
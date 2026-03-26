import mongoose from "mongoose"

 const connectDB = async ()=> {
    await mongoose.connect(`${process.env.MONGODB_URI}/Banktal`).then(()=>console.log("DB Connected"));

}

export default connectDB;
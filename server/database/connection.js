import mongoose from "mongoose";

const connectDatabase = async (url) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url)
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
    }
}


export default connectDatabase;
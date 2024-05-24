import mongoose from 'mongoose';

const connectDB = () =>{
    const mongoUrl = process.env.MONGO_URI;

    if(!mongoUrl){
        console.error('MongoDB URI is not provided.');
        throw new Error('MongoDB URI is not provided.');
    }

    try{
        mongoose.connect(mongoUrl);
        console.log("DB Conneceted");
    }
    catch(error){
        console.error('Error connecting to database:', error);
        throw new Error('Error connecting to database');
    }
}

export default connectDB
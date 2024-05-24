import mongoose from "mongoose";

export interface IModule {
    _id?:mongoose.Schema.Types.ObjectId;
    name:string,
}
const moduleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    }
})

const Module = mongoose.model<IModule>('Module',moduleSchema)
export default Module;
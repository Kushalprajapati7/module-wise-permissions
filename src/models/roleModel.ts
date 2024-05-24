import mongoose from "mongoose";

export interface IRole {
    _id?: mongoose.Schema.Types.ObjectId;
    role:string
}

const roleSchema = new mongoose.Schema(
    {
        role:{
            type:String,
            enum:{
                values:['admin', 'user','author']
            },
            unique:true
        }
    }
)

const Role = mongoose.model<IRole>('Role', roleSchema)

export default Role;


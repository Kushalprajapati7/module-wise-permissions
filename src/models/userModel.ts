import mongoose, { Types } from "mongoose";
import Role, { IRole } from "./roleModel";

export interface IUser{
    username:string;
    email:string;
    password:string;
    role: string; 
    profiles: Types.ObjectId[];
}

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true,'Username is required'],
            unique: true,
        },
        email:{
            type:String,
            required:[true, 'E-mail is required'],

        },
        password:{
            type:String,
            required:[true, 'Password is required'],
        },
        role:{
            type:String,
            enum:{
                values: ['admin', 'author','user']
            },
            default:'user',
        },
        profiles:{
            type: [Types.ObjectId],
        }
    },
    {
        timestamps:true
    }
);

userSchema.pre('save',async function(next){
const roles:any=await Role.findOne({role:this.role});
    if(roles){
        this.profiles.push(roles._id);
        next()
        
    }
    throw new Error('this is not valid role')
})


const User = mongoose.model<IUser>('User',userSchema)
export default User;
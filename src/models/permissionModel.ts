import mongoose,{Schema} from "mongoose";

export interface IPermission {
    moduleId:mongoose.Types.ObjectId,
    roleId:mongoose.Types.ObjectId,
    read:boolean,
    edit:boolean,
    write:boolean,
    delete:boolean
}

const permissionSchema = new mongoose.Schema({
    moduleId:{
        type:Schema.Types.ObjectId,
        ref:"Module"
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"Role"
    },
    read:{
        type:Boolean,
        required:true,
        default:false
    },
    edit:{
        type:Boolean,
        required:true,
        default:false
    },
    write:{
        type:Boolean,
        required:true,
        default:false
    
    },
    delete:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Permission = mongoose.model<IPermission>('Permission', permissionSchema)

export default Permission;
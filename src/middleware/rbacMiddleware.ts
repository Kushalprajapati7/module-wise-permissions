import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import RoleModel, { IRole } from '../models/roleModel';
import CustomRequest from '../types/customRequest';
import Module, { IModule } from '../models/modulesModel';
import Permission from '../models/permissionModel';
import { Types } from 'mongoose';

declare module 'express'{
    interface Request{
        email?:string,
        userId?:string,
        roleId?:string,
        profiles?:Types.ObjectId[],
    }
}


export const rbacMiddleware = (role:string[],module:string,name:string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
           
            console.log(req.profiles);
            const modules =await Module.findOne({name:module});
            if (!modules) {
                return res.status(404).json({ message: 'Module not found' });
            }

            const moduleId = modules._id;
            
            let permisson;
            if(name==='write'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,write:true})
                console.log("write");
            }
            else if(name==='edit'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,edit:true})
                console.log("edit");
            }
            else if(name==='delete'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,delete:true})
                console.log("delete");
            }
            else{
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,read:true})
                console.log("read");
                
            }

            if(!permisson){
                throw new Error('permission for your role is not defined')
            }
            else{
                req.roleId=permisson?.roleId.toString()
                next()
            }
            
            console.log(permisson);

        
            
        } catch (error: any) {
            res.status(500).json({ message: 'permission for your role is not defined' });
        }
    };
};

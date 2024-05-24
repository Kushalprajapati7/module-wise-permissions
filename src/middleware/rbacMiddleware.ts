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
           
            const modules =await Module.findOne({name:module});
            if (!modules) {
                return res.status(404).json({ message: 'Module not found' });
            }

            const moduleId = modules._id;
            
            let permisson;
            if(name==='write'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,write:true})
            }
            else if(name==='edit'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,edit:true})
                
            }
            else if(name==='delete'){
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,delete:true})
            }
            else{
                permisson = await Permission.findOne({roleId:{$in:[...req.profiles!]},moduleId,read:true})
                
            }
            
            if(!permisson){
                res.status(403).json({ error: "permission for your role is not defined!" });
                return
            }
            else{
                next();
            }

            

        
            
        } catch (error: any) {
            res.status(403).json({ message: 'permission for your role is not defined' });
        }
    };
};

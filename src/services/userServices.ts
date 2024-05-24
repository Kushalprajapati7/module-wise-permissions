import User,{IUser} from "../models/userModel";
// import  { UserDocument } from '../interfaces/userInterface'


import bcrypt from 'bcrypt'
import {JwtUtills} from "../utils/jwtUtiils";
class UserServices{
    public async createUser(newUser:IUser):Promise<IUser>{

        const hashPassword = await bcrypt.hash(newUser.password,10);

        newUser.password = hashPassword;
        const user = new User(newUser);
        
        return await user.save();

    }

    public async loginUser(username:string, password:string):Promise<string>{
        const user = await User.findOne({username}).select('+password');
        
        if(!user){
            throw new Error(`User with Username ${username} not found`); 
        }

        const pass = await bcrypt.compare(password,user.password);
        if(!pass){
            throw new Error(`Incorrect password`); 
        }

        const token = JwtUtills.generateToken(user.id, user.role);

        return token;
    }

    public async allUser():Promise<IUser[]>{
        const user = await User.find()
        return user;
    }

    
}

export default new UserServices();
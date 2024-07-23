import User, { IUser } from "../models/userModel";
// import  { UserDocument } from '../interfaces/userInterface'


import bcrypt from 'bcrypt'
import { JwtUtills } from "../utils/jwtUtiils";
import authorModel from "../models/authorModel";
class UserServices {
    public async createUser(newUser: IUser): Promise<IUser> {

        const hashPassword = await bcrypt.hash(newUser.password, 10);

        newUser.password = hashPassword;
        const user = new User(newUser);

        return await user.save();

    }

    public async loginUser(email: string, password: string): Promise<any> {

        let user;
        user = await User.findOne({ email: email })
        if (!user) {
            user = await authorModel.findOne({ email: email })
        }
        if (!user) {
            user = await authorModel.findOne({ email: email })
        }
        if (!user) {
            throw new Error(`User with Email ${email} not found`);
        }

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            throw new Error(`Incorrect password`);
        }
        const role = user.role;
        const token = JwtUtills.generateToken(user.id, user.role);
        return {token,role};
    }

    public async allUser(): Promise<IUser[]> {
        const user = await User.find()
        return user;
    }


}

export default new UserServices();
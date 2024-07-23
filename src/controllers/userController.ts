import { Request, Response } from "express";
import userServices from "../services/userServices";

class UserController {
    public async creatUser(req: Request, res: Response): Promise<void> {
        try {
            const newUser = req.body;
            const User = await userServices.createUser(newUser);
            res.json(User);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const token = await userServices.loginUser(email, password);

            res.json(token)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async getAllUser(req: Request, res: Response): Promise<void> {
        try {
            const allUser = await userServices.allUser();
            if (!allUser) {

                res.status(404).json({ error: "Users Not Found!" });
                return
            }
            res.json(allUser)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }


}

export default new UserController();
import authorServices from "../services/authorServices";
import { Request, Response } from "express";

class AuthorController {
    public async addauthor(req: Request, res: Response): Promise<void> {
        try {
            const { name, biography, nationality } = req.body;
            const newAuthor = await authorServices.createAuthor(name, biography, nationality);
            res.json({ newAuthor, message: "Author Added Successfully" })

        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const author = await authorServices.findAuthorById(id)
            if (!author) {
                res.status(404).json({ error: `Author with Id ${id} not found` });
                return
            }
            const { name, biography, nationality } = req.body;
            const updatedAuthor = await authorServices.updateAuthor(id, name, biography, nationality);
            res.json({ updatedAuthor, message: "Author Updated Successfully" })
        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const author = await authorServices.findAuthorById(id)
            if (!author) {
                res.status(404).json({ error: `Author with Id ${id} not found` });
                return
            }
            await authorServices.deleteAuthor(id);
            res.json({message:"Author deleted Successfully"})    

        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async getAllAuthor(req: Request, res: Response): Promise<void> {
        try {
           
            const allAuthor = await authorServices.getAllAuthor();
            if (!allAuthor) {
                res.status(404).json({ error: `Authors not found` });
                return
            }
            res.json({allAuthor, message:"List Of all Author"})    
        }   
        catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async getAuthorById(req:Request, res:Response):Promise<void>{
        try {
            const id = req.params.id;
            const author = await authorServices.findAuthorById(id);
            if(!author){
                res.status(404).json({ error: `Author with Id ${id} not found` });

            }
            res.json({author, message:`Author of id ${id}`})   
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

}

export default new AuthorController();
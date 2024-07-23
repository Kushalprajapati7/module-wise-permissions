import authorModel from "../models/authorModel";
import {AuthorDocument} from '../interfaces/authorInterface'
import bcrypt from 'bcrypt'

class AuthorServices{
    public async createAuthor(name: string, email:string, password:string, biography: string, nationality: string,role:string): Promise<AuthorDocument> {
        const hashPassword = await bcrypt.hash(password,10);
        
        const newAuthor = new authorModel({ name, email,password:hashPassword, biography, nationality,role })
        return newAuthor.save();
    }

    public async updateAuthor(id: string, name: string, biography: string, nationality: string): Promise<AuthorDocument> {
        const updatedauthor:any = await authorModel.findByIdAndUpdate(id, { name, biography, nationality }, { new: true })
        return updatedauthor;
    }

    public async getAllAuthor(): Promise<AuthorDocument[]> {
        let allAuthor = await authorModel.find()
        // allAuthor = await authorModel.aggregate(
        //     [
        //         {
        //           $project: {
        //             _id: 1,
        //             name: 1,
        //             email:1,
        //             biography: 1,
        //             nationality: 1
        //           }
        //         }
        //       ]
        // )
        return allAuthor;
    }

    public async deleteAuthor(id: string): Promise<void> {
        const author = await authorModel.findByIdAndDelete(id);
    }

    public async findAuthorById(id: string): Promise<AuthorDocument> {
        const author:any = await authorModel.findById(id);
        return author
    }
}

export default new AuthorServices()
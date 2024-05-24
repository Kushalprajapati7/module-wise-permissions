import authorModel from "../models/authorModel";
import {AuthorDocument} from '../interfaces/authorInterface'


class AuthorServices{
    public async createAuthor(name: string, biography: string, nationality: string): Promise<AuthorDocument> {
        const newAuthor = new authorModel({ name, biography, nationality })
        return newAuthor.save();
    }

    public async updateAuthor(id: string, name: string, biography: string, nationality: string): Promise<AuthorDocument> {
        const updatedauthor:any = await authorModel.findByIdAndUpdate(id, { name, biography, nationality }, { new: true })
        return updatedauthor;
    }

    public async getAllAuthor(): Promise<AuthorDocument[]> {
        const allauthor = await authorModel.find()
        return allauthor;
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
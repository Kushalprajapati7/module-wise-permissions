import mongoose from "mongoose";
import {AuthorDocument} from '../interfaces/authorInterface'

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    biography: { type: String, required: true },
    nationality: { type: String, required: true }
},{
    timestamps:true
});

const authorModel = mongoose.model<AuthorDocument>('author',authorSchema);  
export default authorModel
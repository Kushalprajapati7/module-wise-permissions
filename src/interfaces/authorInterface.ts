import mongoose, { Types } from "mongoose";

export interface AuthorDocument {
    _id? : Types.ObjectId;
    name: string;
    email:string;
    password:string;
    biography: string;
    nationality: string;
    role:string ;
}
import mongoose, { Types } from "mongoose";

export interface AuthorDocument {
    _id? : Types.ObjectId;
    name: string;
    biography: string;
    nationality: string;
}
import mongoose,{Schema, Document, Types} from "mongoose";

export interface CategoryDocument{
    _id? :Types.ObjectId;
    name:string;
    description : string;
}

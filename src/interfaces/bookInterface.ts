import mongoose, { Schema, Types } from 'mongoose';

export interface BookDocument {
    _id?: Types.ObjectId;
    title: string;
    author: Types.ObjectId;
    category: Types.ObjectId;
    ISBN : string;
    description : string;
    price : number;
}
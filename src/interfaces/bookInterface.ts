import mongoose, { Schema, Types } from 'mongoose';

export interface BookDocument {
    _id?: Types.ObjectId;
    title: string;
    author: mongoose.Types.ObjectId;
    category: mongoose.Types.ObjectId;
    ISBN : string;
    description : string;
    price : number;
}
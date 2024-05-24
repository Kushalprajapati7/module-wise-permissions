import mongoose,{Schema, Document} from "mongoose";
import {CategoryDocument} from '../interfaces/categoryInterface'

const categorySchema = new Schema(
    {   
        name:{type: String, required:true, unique:true},
        description : {type: String, required:true},
    },
    {
        timestamps:true
    }
)


const CategoryModel = mongoose.model<CategoryDocument>('Category',categorySchema)

export default CategoryModel;
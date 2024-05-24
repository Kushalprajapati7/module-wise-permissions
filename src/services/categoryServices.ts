import CategoryModel  from "../models/categoryModel";
import {CategoryDocument} from '../interfaces/categoryInterface'


class CategoryServices {
    public async createCategory(name: string, description: string): Promise<CategoryDocument> {
        const newCategory = new CategoryModel({ name, description });
        return await newCategory.save()
    }

    public async updateCategory(id: string, name: string, description: string): Promise<CategoryDocument> {
        const updateCategory:any = await CategoryModel.findByIdAndUpdate(id, { name, description }, { new: true })
        return updateCategory;
    }

    public async deleteCategory(id:string):Promise<void>{
        await CategoryModel.findByIdAndDelete(id)
    }

    public async showCategories():Promise<CategoryDocument[]>{
        const all:CategoryDocument[] = await CategoryModel.find();
        return all;
    }

    public async showCategoryById(id:string):Promise<CategoryDocument>{
        const category:any = await CategoryModel.findById(id);
        return category
    }


}

export default new CategoryServices();
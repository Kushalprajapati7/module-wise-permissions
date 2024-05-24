import categoryServices from "../services/categoryServices";
import { Request, Response } from "express";

class CategoryController{
    public async create(req:Request, res:Response):Promise<void>{
        try {
            const {name, description} = req.body;
            const category = await categoryServices.createCategory(name,description);
            res.json({category, message:"Category Added Successfully"})    
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async update(req:Request, res:Response):Promise<void>{
        try {
            const id = req.params.id;
            const {name, description} = req.body;
            const category = await categoryServices.updateCategory(id,name,description);
            res.json({category, message:"Category Updated Successfully"})    
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async delete(req:Request, res:Response):Promise<void>{
        try {
            const id = req.params.id;
            const category = await categoryServices.deleteCategory(id);
            res.json({category, message:"Category deleted Successfully"})    
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async allCategory(req:Request, res:Response):Promise<void>{
        try {
            const category = await categoryServices.showCategories();
            res.json({category, message:"List Of Category"})    
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async categoryById(req:Request, res:Response):Promise<void>{
        try {
            const id = req.params.id;
            const category = await categoryServices.showCategoryById(id);
            res.json({category, message:`Category of id ${id}`})    
        } catch (error:any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}


export default new CategoryController();
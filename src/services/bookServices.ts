import BookModel from "../models/bookModel";
import { BookDocument } from '../interfaces/bookInterface';


class BookServices {
    public async createBook(title: string, author: string, category: string, ISBN: string, description: string, price: number): Promise<BookDocument> {
        const newBook = new BookModel({ title, author, category, ISBN, description, price });
        return await newBook.save();
    }

    public async updateBook(id: string, title: string, author: string, category: string, ISBN: string, description: string, price: number): Promise<BookDocument> {

        const updatedBook: any = await BookModel.findByIdAndUpdate(id, { title, author, category, ISBN, description, price }, { new: true });
        return updatedBook;
    }

    public async deleteBook(id: string): Promise<void> {
        await BookModel.findByIdAndDelete(id);
    }

    public async showAllBook(): Promise<BookDocument[]> {
        // let books = await BookModel.find();
        let books = await BookModel.aggregate(
            //     //     [
            //     //     {
            //     //         $project:{
            //     //             _id:1,
            //     //             title:1,
            //     //             author:1,
            //     //             category:1, ISBN:1, description:1, price:1,
            //     //             createdAt:{ $dateToString: {
            //     //                 date: "$createdAt",
            //     //                 timezone: "Asia/Kolkata",
            //     //                 format: "%d-%m-%Y %H:%M:%S"
            //     //               }},
            //     //             updatedAt:{ $dateToString: {
            //     //                 date: "$updatedAt",
            //     //                 timezone: "Asia/Kolkata",
            //     //                 format: "%d-%m-%Y %H:%M:%S"
            //     //               }},
            //     //         }
            //     //     }
            //     // ]
            [
                {
                    $lookup: {
                        from: "authors",
                        localField: "author",
                        foreignField: "_id",
                        as: "author_details"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category_details"
                    }
                },
                {
                    $unwind: "$author_details"
                },
                {
                    $unwind: "$category_details"
                },
                {
                    $addFields: {
                        author_name: "$author_details.name",
                        category_name: "$category_details.name"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        author_details: 0,
                        category_details: 0,
                        author: 0,
                        category: 0,
                        __v: 0
                    }
                }
            ]
        )
        return books;
    }

    public async showBookById(id: string): Promise<BookDocument> {
        const book: any = await BookModel.findById(id);
        return book;
    }

    public async bookByAutherId(authorId: string): Promise<BookDocument[]> {
        const books: BookDocument[] = await BookModel.find({ author: authorId });
        return books
    }
}

export default new BookServices();
import mongoose, { Schema } from 'mongoose';
import { BookDocument } from '../interfaces/bookInterface';
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'author', required: true },
    category: {type:Schema.Types.ObjectId, ref: 'Category', required: true},
    ISBN: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true,
});

const BookModel = mongoose.model<BookDocument>('Book', bookSchema);
export default BookModel;

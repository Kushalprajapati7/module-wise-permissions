import express, { Request, Response } from "express";
import connectDB from "./config/database";
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'
import categoryRoutes from './routes/categoryRoutes'
import authorRoutes from './routes/authorRoutes'
import bookRoutes from './routes/bookRoutes'

dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/author',authorRoutes);
app.use('/api/book', bookRoutes)

connectDB().then(() => {

    app.listen(port, () => {
        console.log(`server is On`);

    })
}).catch((error: any) => {
    console.log("Error starting server :", error.message);
});

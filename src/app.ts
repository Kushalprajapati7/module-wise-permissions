import express, { Request, Response, NextFunction } from 'express';
import connectDB from './config/database';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error: any) => {
  console.log('Error starting server:', error.message);
});

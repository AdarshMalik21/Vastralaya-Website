import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { mongoDb } from "./config/mongoDb.js";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
// console.log(process.env.MONGO_URI)
mongoDb()
// Enable CORS with credentials so browser can send/receive httpOnly cookies
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
// Without cookie-parser, cookies are just a string in headers.
// With cookie-parser, they become an object.
app.use("/uploads", express.static("uploads"));



app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);



app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
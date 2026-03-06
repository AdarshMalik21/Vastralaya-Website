import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import { mongoDb } from "./config/mongoDb.js";

dotenv.config();

const app = express();
// console.log(process.env.MONGO_URI)
mongoDb()
app.use(cors());
app.use(express.json());



app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);


app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
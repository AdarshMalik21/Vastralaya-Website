import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("mongoDB connected"))
.catch((error) => console.log(error));

app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);


app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
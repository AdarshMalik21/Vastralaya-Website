import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {User} from "./Model/user.model.js";

dotenv.config();

const createSuperAdmin = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const existing = await User.findOne({ email: "super@admin.com" });

    if (existing) {
      console.log("Super admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Super Admin",
      email: "super@admin.com",
      password: hashedPassword,
      role: "superadmin",
    });

    console.log("Super Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createSuperAdmin();
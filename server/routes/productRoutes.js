import express from "express"
import upload from "../middleware/upload.js"
import { createProduct, findAllProduct } from "../controllers/productController.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router=express.Router()
router.post(
  "/create-product",
   authorizeRoles("superadmin"),
  upload.array("images", 5),
  createProduct
);
router.get("/getAll",findAllProduct)

export default router   
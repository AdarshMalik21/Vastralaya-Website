import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    category: {
      type: String,
      ref: "Category",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        url: String,
      },
    ],
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);

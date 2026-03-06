import { Product } from "../Model/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, brand, category, price, discountPrice, stock } =
      req.body;

    console.log(name);
    if (
      !name ||
      !description ||
      !category ||
      !price ||
      !discountPrice ||
      !stock
    )
      return res.json({ message: "inputs are missing" });

    const images = req.files.map((file) => ({
      url: `/uploads/products/${file.filename}`,
    }));

    const productdata = Product.create({
      name,
      description,
      brand,
      category,
      price,
      discountPrice,
      stock,
      brand,
      images,
    });

    res
      .status(200)
      .json({ message: "product created successfully", productdata });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const findAllProduct = async (req, res) => {
  try {
    const productData = await Product.find();
    if (productData.length < 1)
      return res.json({ message: "no products are created" });

    return res.json({ message: "all products", productData });
  } catch (error) {
    return res.json({ message: "Internal server error" });
  }
};

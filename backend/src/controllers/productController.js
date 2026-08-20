import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { image, title, desc, price, categoryId } = req.body;
    let newProduct = await Product.create({
      image,
      title,
      desc,
      price,
      category: categoryId,
    });
    if (!newProduct) {
      return res.status(400).json({ message: "Product yaratilmadi❌" });
    }

    return res.status(201).json({ message: "Product yaratildi", newProduct });
  } catch (err) {
     console.log(err);
     
    return res.status(500).json({ message: "Failed server" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    let allProduct = await Product.find().populate("category");

    return res.status(200).json({ message: "Category yuborildi", allProduct });
  } catch (err) {
     console.log(err);
     
    return res.status(500).json({ message: "Failed server" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { image, title, desc, price, categoryId } = req.body;
   

    const id = req.params.id;

    let updateProduct= await Product.findByIdAndUpdate(
      { _id: id },
      { image, title, desc, price, categoryId },
      { new: true },
    );
    if (!updateProduct) {
      return res.status(400).json({ message: "Product yangilanmadi❌" });
    }

    return res
      .status(200)
      .json({ message: "Product yangilandi", updateProduct });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(400).json({ message: "Product o'chirilmadi" });
    }

    return res.status(200).json({ message: "Product ochirildi" });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

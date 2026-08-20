import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { title, desc } = req.body;
    console.log(title, desc);
    
    let newCategory = await Category.create({ title, desc });
    if (!newCategory) {
      return res.status(400).json({ message: "Categori yaratilmadi❌" });
    }

    return res.status(201).json({ message: "Category yaratildi", newCategory });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    let allCategory = await Category.find();

    return res.status(200).json({ message: "Category yuborildi", allCategory });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const editCategory = async (req, res) => {
  try {
    const { title, desc } = req.body;
    console.log(title, desc);

    const id = req.params.id;

    let updateCategory = await Category.findByIdAndUpdate(
      { _id: id },
      { title, desc },
      { new: true },
    );
    if (!updateCategory) {
      return res.status(400).json({ message: "Categori yangilanmadi❌" });
    }

    return res
      .status(200)
      .json({ message: "Category yangilandi", updateCategory });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let deleteCategory = await Category.findByIdAndDelete(id);
    if (!deleteCategory) {
      return res.status(400).json({ message: "Category o'chirilmadi" });
    }

    return res.status(200).json({ message: "Category ochirildi" });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transactions = require("../model/Transactions");

//! Category

const categoryController = {
  //* add category
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type required in the creation of category");
    }
    // convert category name to lowercase
    const normalizedName = name.toLowerCase();
    // !Check if the type is validate
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error(`Category type  ${type} not valid`);
    }
    // !Check if category exist on the user account
    const categoryExist = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if (categoryExist) {
      throw new Error(
        `Category ${categoryExist.name} already exist in the database`
      );
    }
    //! Create category
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json({
      message: "Category Created",
      category,
    });
  }),
  // *Lists
  lists: asyncHandler(async (req, res) => {
    // get all category
    const categories = await Category.find({ user: req.user });
    res.status(200).json({ categories });
  }),
  // * Update
  update: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not Found or user not authorized");
    }
    const oldName = category.name;
    category.name = normalizedName;
    category.type = type;
    const updatedCategory = await category.save();
    // Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transactions.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: {
            category: updatedCategory.name,
          },
        }
      );
    }
    res.json(updatedCategory);
  }),
  // * delete
  delete: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category && category.user.toString() === req.user.toString()) {
      const defaultCategory = "Uncategorized";
      await Transactions.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: {
            category: defaultCategory,
          },
        }
      );
      // remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({
        message: "category removed and transactions updated",
      });
    } else {
      res.json({
        message: "category not found or user not authorized",
      });
    }
  }),
};

module.exports = categoryController;

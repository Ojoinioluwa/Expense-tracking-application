const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transactions = require("../model/Transactions");

//! Category

const transactionController = {
  //* add category
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error(
        "Amount,type and date required in the creation of Transaction"
      );
    }
    // create transaction
    const transaction = await Transactions.create({
      user: req.user,
      type,
      amount,
      category,
      date,
      description,
    });
    res.json(transaction);
  }),

  // *Filter && list
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filters = { user: req.user };

    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }
    if (type) {
      filters.type = type;
    }
    if (category) {
      if (category === "All") {
        // no category fltered needed for all
      } else if (category === "Uncategorized") {
        filters.category = "Uncategorized";
      } else {
        filters.category = category;
      }
    }
    const filteredTransactions = await Transactions.find(filters).sort({
      date: -1,
    });
    res.status(200).json(filteredTransactions);
  }),
  // * Update
  update: asyncHandler(async (req, res) => {
    // ! find by Id
    const transaction = await Transactions.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),
  // * delete
  delete: asyncHandler(async (req, res) => {
    // ! find by Id
    const transaction = await Transactions.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({
        message: "Transaction deleted",
      });
    }
  }),
};

module.exports = transactionController;

const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");
const transactionController = require("../controllers/transactionCtrl");

const transactionRouter = express.Router();

// ? add
transactionRouter.post(
  "/api/v1/transactions/create",
  isAuthenticated,
  transactionController.create
);

// ? filter && list the transaction by the users info or by the user alone
transactionRouter.get(
  "/api/v1/transactions/lists",
  isAuthenticated,
  transactionController.getFilteredTransactions
);

// ? Update
transactionRouter.put(
  "/api/v1/transactions/update:id",
  isAuthenticated,
  transactionController.update
);

// ? Update
transactionRouter.delete(
  "/api/v1/transactions/delete:id",
  isAuthenticated,
  transactionController.delete
);

module.exports = transactionRouter;

const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");

const categoryRouter = express.Router();

// ? add
categoryRouter.post(
  "/categories/create",
  isAuthenticated,
  categoryController.create
);

// ? Listing
categoryRouter.get(
  "/categories/lists",
  isAuthenticated,
  categoryController.lists
);
// ? update
categoryRouter.put(
  "/categories/update/:id",
  isAuthenticated,
  categoryController.update
);
// ? delete
categoryRouter.delete(
  "/categories/delete/:id",
  isAuthenticated,
  categoryController.delete
);

module.exports = categoryRouter;

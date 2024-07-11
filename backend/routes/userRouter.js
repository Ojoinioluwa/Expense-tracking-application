const express = require("express");
const userController = require("../controllers/usersCtrl");
const isAuthenticated = require("../middlewares/isAuth");

const userRouter = express.Router();

// ? Register
userRouter.post("/users/register", userController.register);

// ? Login
userRouter.post("/users/login", userController.login);

// ? Profile
userRouter.get(
  "/users/profile",
  isAuthenticated,
  userController.profile
);
// ? Change password
userRouter.put(
  "/users/change-password",
  isAuthenticated,
  userController.changeUserPassword
);
// ? Update profile
userRouter.put(
  "/users/update-profile",
  isAuthenticated,
  userController.updateUserProfile
);

module.exports = userRouter;

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

//! USer registration

const userController = {
  //* register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    //!  validate
    if (!username || !email || !password) {
      throw new Error("Please all Fields are required");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("User already exist");
    }
    //! Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // !create user and save into the database
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),
  // *Login
  login: asyncHandler(async (req, res) => {
    // Get the user data
    const { email, password } = req.body;
    // ! if email is found
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    // ! compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    // ! generate token for the user
    const token = jwt.sign({ id: user._id }, "Ojaykey", {
      expiresIn: "30d",
    });
    res.json({
      message: "login successfully",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  // * profile
  profile: asyncHandler(async (req, res) => {
    // Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    // Send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),
  // *Update or change password
  changeUserPassword: asyncHandler(async (req, res) => {
    // get the new password
    const { newPassword } = req.body;
    // Find the user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    // !Re save the user
    await user.save({
      validateBeforeSave: false,
    });
    // Send the response
    res.json({
      message: "Password update successfull",
    });
  }),
  //* Update user profile
  updateUserProfile: asyncHandler(async (req, res) => {
    // get the new DETAILS
    const { email, username } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username, email },
      { new: true }
    );
    // Send the response
    res.json({
      message: "Profile update successfully",
      updatedUser,
    });
  }),
};

module.exports = userController;

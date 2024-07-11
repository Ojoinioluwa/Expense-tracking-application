const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMessage");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

// !connect to database

mongoose
  .connect(
    "mongodb+srv://ojoinioluwa05:owobCi68qHHWKbQG@oay.vupnvf7.mongodb.net/Expense-tracker"
  )
  .then(() => console.log("Database connected successfully...."))
  .catch((err) => console.log(err));
// !Cors configuration
const corsOptions = {
  origin: ["https://expense-tracking-application-frontend.onrender.com"],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// middlewares
app.use(express.json()); //? Pass incoming json data
// !Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
// Error handler
app.use(errorHandler);
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`The app running on Port ${PORT}....`));

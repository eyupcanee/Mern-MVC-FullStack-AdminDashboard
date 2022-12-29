import mongoose from "mongoose";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        "secret123"
      );

      res.json({ status: "ok", token: token });
    } else {
      res.json({ status: "no" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLastUser = async (req, res) => {
  try {
    const user = await User.find().sort({ _id: -1 }).limit(1);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    const totalCustomers = await User.countDocuments({ role: "user" });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id, token } = req.params;

  if (
    jwt_decode(token).role === "admin" ||
    jwt_decode(token).role === "superadmin"
  ) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully!" });
  } else {
    res.status(404).json({ message: "Auth failed!" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id, token } = req.params;

  if (
    jwt_decode(token).role === "admin" ||
    jwt_decode(token).role === "superadmin"
  ) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No product with id : ${id}`);
    }

    await Product.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully!" });
  } else {
    res.status(404).json({ message: "Auth Failed!" });
  }
};

export const insertUser = async (req, res) => {
  const {
    name,
    email,
    password,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    transactions,
    role,
  } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    transactions,
    role,
  });

  try {
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertProduct = async (req, res) => {
  const {
    name = "",
    price = 0,
    description = "",
    category = "",
    rating = "",
    supply = "",
  } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    rating,
    supply,
  });

  try {
    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertProductStats = async ({
  id,
  yearlySalesTotal,
  yearlyTotalSoldUnits,
}) => {
  const newProductStats = new ProductStat({
    id,
    yearlySalesTotal,
    yearlyTotalSoldUnits,
    monthlyData: [],
    dailyData: [],
  });

  try {
    await newProductStats.save();
  } catch (error) {}
};

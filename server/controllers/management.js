import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import jwt_decode from "jwt-decode";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" || "superadmin" }).select(
      "-password"
    );
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id, token } = req.params;

  if (jwt_decode(token).role === "superadmin") {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No admin with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "Admin deleted successfully!" });
  } else {
    res.status(404).json({ message: "Auth failed!" });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

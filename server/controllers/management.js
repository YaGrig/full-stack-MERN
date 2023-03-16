import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// AGGREGATE CALLS !!!!!
// all this math e t c watch on mongo db aggregate!!!
// lookup:  WE LOOKING FOR IF _id OF LOCAL TABLE IN FOREIGN TABLE IN FORM OF userId key AND DISPLAY THIS INFO "AS"
export const getUserPerfomance = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats", // property userWithStats will have storing this info
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      }) // geting info using affiliateStats property
    );
    const fiteredSalesTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );
    res
      .status(200)
      .json({ user: userWithStats[0], sales: fiteredSalesTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

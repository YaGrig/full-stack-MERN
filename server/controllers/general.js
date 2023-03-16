import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "Novemnber";
    const currentYear = "2021";
    const currentDay = "2021-11-15";

    // recent Transactions (latest 15)
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });
    // sort them backwards
    // overall stats
    const overallstats = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallstats[0];

    const thisMonthStats = overallstats[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const TodayStats = overallstats[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });
    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      TodayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

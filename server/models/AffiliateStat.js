import mongoose from "mongoose";

// We creating MODEL FOR INFO FROM 2 DIFFERENT TABLES (USER AND PRODUCT)
// TYPE OBJECT ID - IS ID THAT MONGOOSE GAVE THEM, REF IS REFERENCE TO EXISTING MODEL
const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;

const mongoose = require("mongoose");

const ads = {
  _id: mongoose.Schema.Types.ObjectId,
  isHidden: { type: Boolean, default: true },
  images: [{ type: String, isRequired: true }],
  kind: {
    type: String,
    enum: ["Gold", "Sliver", "Bronze"],
  },
};

const adsSchema = mongoose.Schema(ads);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = { Ads, ads };

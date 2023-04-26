const mongoose = require("mongoose");

const business = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  phone: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "phone field is required",
    },
  },
  website: { type: String },
  email: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "email field is required",
    },
    unique: true,
    isEmail: { bail: true, errorMessage: "invalid email format" },
  },
  logo: { type: String },
  banner: { type: String },
  isActive: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  isPartner: { type: Boolean, default: false },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
};

const businessSchema = mongoose.Schema(business);

const Business = mongoose.model("Business", businessSchema);

module.exports = { Business, business };

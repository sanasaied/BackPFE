const mongoose = require("mongoose");
const sizes = {
  XXXS: "XXXS",
  XXS: "XXS",
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
};
const product = {
  _id: mongoose.Schema.Types.ObjectId,
  sku: { type: String },
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  price: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "price field is required",
    },
  },
  promotion: { type: mongoose.Schema.Types.ObjectId, ref: "Promotion" },
  new: { type: Boolean, default: false },
  feedbacks: [
    {
      ref: "Feedback",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  saleCount: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tag: [{ type: String }],
  variation: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      color: { type: String },
      image: { type: String },
      size: [{ name: { type: String, enum: sizes }, stock: { type: Number } }],
    },
  ],
  description: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "description field is required",
    },
  },
  /*quantity: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "quantity field is required",
    },
    isNumeric: true,
    errorMessage: "please enter a number",
  },*/

  image: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "image field is required",
    },
  },
  viewsNumber: { type: Number, default: 0 },
  isHidden: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isSponsored: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
  point: { type: Number },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
};

const productSchema = mongoose.Schema(product);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, product };

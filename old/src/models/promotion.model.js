const mongoose = require("mongoose");

const promotion = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  description: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "description field is required",
    },
  },
  startAt: { type: Date, isRequired: true, default: Date.now },
  endAt: {
    type: Date,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "end date field is required",
    },
  },
  value: {
    type: Number,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "value field is required",
    },
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
};

const promotionSchema = mongoose.Schema(promotion);
const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = { Promotion, promotion };

/***** GLOBAL IMPORTS *****/
const mongoose = require("mongoose");

const category = {
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "name field is required",
    },
  },
  image: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "image field is required",
    },
  },
  icon: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "icon field is required",
    },
  },
  subCategories: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
        isRequired: true,
        notEmpty: {
          negated: false,
          errorMessage: "name field is required",
        },
      },
      image: {
        type: String,
        isRequired: true,
        notEmpty: {
          negated: false,
          errorMessage: "image field is required",
        },
      },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
  ],
};

const categorySchema = mongoose.Schema(category);

const Category = mongoose.model("Category", category);

module.exports = Category;

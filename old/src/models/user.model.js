const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const user = {
  _id: mongoose.Schema.Types.ObjectId,
  fullName: {
    type: String,
    isRequired: true,
    isLength: {
      errorMessage: "name should be at least 5 chars long",
      options: { min: 5 },
    },
  },
 /* isAlpha: {
    negated: false,
    errorMessage: "name has to be alphabetic",
  }, */

  phone: { type: Number, isRequired: true, unique: true, notEmpty: true },
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
  password: {
    type: String,
    isRequired: true,
    notEmpty: {
      negated: false,
      errorMessage: "password field is required",
    },
    isLength: {
      errorMessage: "Password should be at least 8 chars long",
      options: { min: 8 },
    },
  },
  gender: { type: String, enum: ["Homme", "Femme", "Autre"], isRequired: true },
  birthday: { type: Date, isRequired: true },
  image: { type: String },
  isActive: { type: Boolean, default: false },
  resetCode: { type: Number },
  role: { type: String, enum: ["SA", "A", "C"], default: "C" },
  isInfluencer: { type: Boolean, default: false },
  credit: { type: Number, default: 0 },
  point: { type: Number, default: 0 },
  promoCode: { type: String },
};

userSchema = mongoose.Schema(user);

userSchema.pre("save", async function () {
  if (this.password) {
    const salt = await bcrypt.genSalt(process.env.SALT_ENCRYPTION);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User, user };

const mongoose = require("mongoose");

const feedback = {
  _id: mongoose.Schema.Types.ObjectId,
  message: { type: String },
  stars: { type: Number },
  creator: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  product: { ref: "Product", type: mongoose.Schema.Types.ObjectId },
};

const feedbackSchema = mongoose.Schema(feedback);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = { Feedback, feedback };

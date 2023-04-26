const mongoose = require("mongoose");

const order = {
  _id: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["Delivered", "Delivering", "Ready To Be Picked", "Return"],
  },
  isCancelled: { type: Boolean, default: false },
  total: { type: Number },
  orderer: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  products: [
    {
      product: { ref: "Product", type: mongoose.Schema.Types.ObjectId },
      quantity: { type: Number, default: 1 },
    },
  ],
};

const orderSchema = mongoose.Schema(order);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, order };

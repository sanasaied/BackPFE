const mongoose = require("mongoose");
const fs = require("fs");
const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const {
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
const Product = productModel.Product;
const Category = categoryModel.Category;

const getAll = async (req, res) => {
  const product = await Product.find().populate("categories", "name").exec();
  return res.status(200).json(product);
};
const getAllApproved = async (req, res) => {
  const product = await Product.find({ isApproved: true })
    .sort({ price: 1 })
    .populate("categories", "name")
    .exec();
  return res.status(200).json(product);
};
const getFeatured = async (req, res) => {
  const product = await Product.find({ isApproved: true, new: true })
    .sort({ price: 1 })
    .limit(8)
    .populate("categories", "name")
    .exec();
  return res.status(200).json(product);
};
const getProduct = async (req, res) => {
  const product = await Product.findById(req.body._id)
    .populate("categories", "name")
    .exec();
  if (product == null) {
    return res.status(404).json("error hapened");
  }
  return res.status(200).json(product);
};
const deleteProduct = (req, res) => {
  Product.remove({ _id: req.body.id }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.body.id, req.body, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const createProduct = (req, res) => {
  const product = new Product(req.body);
  product._id = new mongoose.Types.ObjectId();
  var dir = "uploads/product/";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (uploadMultipleImages(req, res) != null) {
    uploadMultipleImages(req, res).forEach((file) => {
      console.log(file);
      product.images.push(dir + file.filename);
    });
  }

  product
    .save()
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
module.exports = {
  getAll,
  getAllApproved,
  getFeatured,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};

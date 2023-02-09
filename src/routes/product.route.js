const express = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middlewares/validate.schema");
const { product } = require("../models/product.model");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.get('/all', productController.getAll);
router.get('/', productController.getAllApproved);
router.get('/details', productController.getProduct);
router.delete('/delete', productController.deleteProduct);
module.exports = router;

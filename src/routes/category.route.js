const express = require("express");
const { checkSchema } = require("express-validator");
const { validate } = require("../middlewares/validate.schema");
const { category } = require("../models/category.model");
const categoryController = require("../controllers/category.controller");
const {uploadMultiple} = require("../middlewares/upload.multiple.image");
const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/details', categoryController.getCategory);
router.post('/create', uploadMultiple, categoryController.createCategory);

module.exports = router;

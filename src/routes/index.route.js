const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const productRoute = require("./product.route");
const businessRoute = require("./business.route");
const categoryRoute = require("./category.route");
const sliderRoute = require("./slider.route");
const adsRoute = require("./ads.route");
const uploadRoute = require("./upload.route");

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/business", businessRoute);
router.use("/category", categoryRoute);
router.use("/slider", sliderRoute);
router.use("/ads", adsRoute);
router.use("/upload", uploadRoute);

module.exports = router;

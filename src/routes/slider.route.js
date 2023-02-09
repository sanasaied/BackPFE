const express = require("express");
const { slider } = require("../models/slider.model");
const sliderController = require("../controllers/slider.controller");

const router = express.Router();

router.get('/all', sliderController.getAll);
router.get('/', sliderController.getShown);

module.exports = router;
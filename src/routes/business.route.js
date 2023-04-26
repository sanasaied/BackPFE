const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const { validate } = require("../middlewares/validate.schema");
const { business } = require("../models/business.model");
const { upload } = require("../middlewares/upload.image");
const businessController = require("../controllers/business.controller");

router.get("/", businessController.getAll);
router.get("/filter", businessController.getBusinessBy);
router.get("/featured", businessController.getFeaturedBusinesses);
router.get("/featuredLogos", businessController.getFeaturedBusinessesLogos);
router.get("/details", businessController.getBusiness);
router.delete("/delete", businessController.deleteBusiness);
router.patch("/edit", businessController.updateBusiness);
router.post(
  "/create",
  upload.single("logo"),
  // validate(checkSchema(business)),
  businessController.createBusiness
);

module.exports = router;

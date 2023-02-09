const mongoose = require("mongoose");
const adsModel = require("../models/ads.model");
const Ads = adsModel.Ads;
const {
  uploadMultipleImages,
} = require("../middlewares/upload.multiple.image");
const getAll = async (req, res) => {
  const ads = await Ads.find().exec();
  return res.status(200).json(ads);
};
const getShown = async (req, res) => {
  const ads = await Ads.find({ isHidden: false }).exec();
  return res.status(200).json(ads);
};
const deleteAd = async (req, res) => {
  Ads.remove({ _id: req.body.id }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};
const createAd = (req, res) => {
  const ad = new Ads(req.body);
  ad._id = new mongoose.Types.ObjectId();
  uploadMultipleImages(req, res).forEach((file) => {
    console.log(file);
    ad.images.push(file.destination + file.filename);
  });
  ad.save()
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((error) => {
      return res.status(error.code).json(error);
    });
};

const updateAd = async (req, res) => {
  await Ads.findByIdAndUpdate(req.body.id, req.body, (error, result) => {
    if (error) return res.status(error.code).json(error);
    else return res.status(200).json(result);
  });
};

module.exports = {
  getAll,
  getShown,
  deleteAd,
  createAd,
  updateAd,
};

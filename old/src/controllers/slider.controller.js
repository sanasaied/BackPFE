const mongoose = require("mongoose");
const sliderModel = require("../models/slider.model");
const Slider = sliderModel.Slider;

const getAll = async (req, res) => {
    const slider = await Slider.find().exec();
    return res.status(200).json(slider);
};
const getShown = async (req, res) => {
    const slider = await Slider.find({isHidden: false}).exec();
    return res.status(200).json(slider);
}
const deleteSlider = async (req, res) => {
    Slider.remove({_id: req.body.id}, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};

module.exports = {
    getAll, getShown, deleteSlider
};
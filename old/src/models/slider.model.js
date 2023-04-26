const mongoose = require("mongoose");

const slider = {
    _id: mongoose.Schema.Types.ObjectId,
    isHidden: { type: Boolean, default: true },
    image: {type : String, isRequired: true}
};

const sliderSchema = mongoose.Schema(slider);

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = { Slider, slider };

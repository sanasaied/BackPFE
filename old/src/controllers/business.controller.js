const mongoose = require("mongoose");
const businessModel = require("../models/business.model");
const Business = businessModel.Business;

const getAll = async (req, res) => {
    const business = await Business.find().sort({name: 1}).exec();
    return res.status(200).json(business);
};
const getBusiness = (req, res) => {
    Business.findById(req.body.id, (error, business) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(business);
    });
};

const getBusinessBy = async (req, res) => {
    const business = await Business.find(req.body).sort({name: 1}).exec();
    return res.status(200).json(business);
};

const deleteBusiness = (req, res) => {
    Business.remove({_id: req.body.id}, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const updateBusiness = (req, res) => {
    Business.findByIdAndUpdate(req.body.id, req.body, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const createBusiness = (req, res) => {
    const business = new Business(req.body);
    business._id = new mongoose.Types.ObjectId();
    Business.exists({name: req.body.name}, (error, result) => {
        if (error) return res.status(500).json(error);
        if (!result) {
            business.save().then(data => {
                console.log(data);
                return res.status(201).json(data);
            }).catch(error => {
                console.log(error);
                return res.status(error.code).json(error);
            });
        } else {
            console.log("Business Exists", result);
            return res.status(404).json(result);
        }

    });

}
module.exports = {getAll, getBusiness, deleteBusiness, updateBusiness, createBusiness, getBusinessBy};
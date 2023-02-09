const mongoose = require("mongoose");
const categoryModel = require("../models/category.model");
const Category = categoryModel.Product;

const getAll = async (req, res) => {
    const category = await Category.find().sort({name: 1}).exec();
    return res.status(200).json(category);
};
const getCategory = async (req, res) => {
    Category.findById(req.body, (error, category) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(category);
    });
};
const updateCategory = async (req, res) => {
    Category.findByIdAndUpdate(req.body.id, req.body, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const deleteCategory = async (req, res) => {
    Category.remove({_id: req.body.id}, (error, result) => {
        if (error) return res.status(error.code).json(error); else return res.status(200).json(result);
    });
};
const createCategory = async (req, res) => {
    const category = new Category(req.body);
    category._id = new mongoose.Types.ObjectId();
    category.exists({name: req.body.name}, (error, result) => {
        if (error) return res.status(500).json(error);
        if (!result) {
            category.save().then(data => {
                console.log(data);
                return res.status(201).json(data);
            }).catch(error => {
                console.log(error);
                return res.status(error.code).json(error);
            });
        } else {
            return res.status(404).json(result);
        }
    });
};

const createSubCategory = async (req, res) => {
        Category.findOneAndUpdate(req.body.id, {
            $addToSet: {
                subCategories: [{
                    name: req.body.name,
                    image: req.body.image,
                    _id: new mongoose.Types.ObjectId()
                }]
            }
        }).then((error, result) => {
            if (error) return res.status(error.code).json(error);
            return res.status(201).json(result);
        });
};
const deleteSubCategory = async (req, res) => {
};
const updateSubCategory = async (req, res) => {
    Category.findOneAndUpdate(req.body.id, {
        $set: {
            subCategories: [{
                name: req.body.name,
                image: req.body.image,
            }]
        }
    }).then((error, result) => {
        if (error) return res.status(error.code).json(error);
        return res.status(201).json(result);
    });
};

module.exports = {
    getAll, getCategory, createCategory, updateCategory, deleteCategory
};
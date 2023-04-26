const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const sendmail = require("../utils/sendmail");
const User = userModel.User;
require("dotenv").config();

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "No user with this email" });
  } else {
    const verified = bcrypt.compareSync(req.body.password, user.password);
    if (verified) {
      if (user.isActive) return res.status(200).json(user);
      else return res.status(401).json({ message: "not active" });
    } else {
      return res.status(404).json({ message: "incorrect password" });
    }
  }
};
const register = async (req, res) => {
  const user = new User(req.body);
  user._id = new mongoose.Types.ObjectId();
  const activationCode = Math.floor(Math.random() * (999999 - 100001)) + 100000;
  user.resetCode = activationCode;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: req.body.email,
    subject: "[Tinar] - Activate your account",
    text: "Activation code : " + activationCode,
  };
  User.exists({ email: req.body.email }, (error, result) => {
    if (error) return res.status(error.code).json(error);
    if (!result) {
      user
        .save()
        .then((data) => {
          console.log(data);
          // must send mail here !
          //  sendmail(mailOptions);
          return res.status(201).json(data);
        })
        .catch((err) => {
          console.log(err);
          return res
            .status(err.code)
            .json({ error: err, message: "User cannot be saved" });
        });
    } else {
      console.log("User Exists", result);
      return res
        .status(404)
        .json({ error: result, message: "User already exists" });
    }
  });
};
const activateAccount = (req, res) => {
  User.find({ email: req.body.email }, (error, user) => {
    if (error) return res.status(error.code).json(error);
    console.log(user);
    if (user.length > 0) {
      if (user[0].resetCode === req.body.code) {
        User.findOneAndUpdate(
          { email: req.body.email },
          { $set: { isActive: true } },
          (error, result) => {
            if (error) {
              return res.status(error.code).json(error);
            }
            return res.status(200).json(result);
          }
        );
      }
    } else {
      return res.status(404).json(user);
    }
  });
};
const resetPassword = (req, res) => {
  // const activationCode = Math.floor(Math.random() * (999999 - 100001)) + 100000;
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        resetCode: Math.floor(Math.random() * (999999 - 100001)) + 100000,
      },
    },
    (error, result) => {
      if (error) {
        return res.status(error.code).json(error);
      }
      return res.status(200).json(result);
    }
  );
};
const verifyCode = (req, res) => {
  User.find({ email: req.body.email }, (error, user) => {
    if (error) return res.status(error.code).json(error);
    console.log(user);
    if (user.length > 0) {
      if (user[0].resetCode === req.body.code) {
        return res.status(200).json(user);
      }
    } else {
      return res.status(404).json({ message: "Invalid code" });
    }
  });
};
const updatePassword = async (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        password: await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        ),
      },
    },
    (error, result) => {
      if (error) {
        return res.status(error.code).json(error);
      }
      return res.status(200).json(result);
    }
  );
};

module.exports = {
  register,
  login,
  activateAccount,
  resetPassword,
  verifyCode,
  updatePassword,
};

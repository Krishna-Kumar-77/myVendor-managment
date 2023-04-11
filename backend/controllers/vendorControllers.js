const Vendor = require("../models/vendorModel");
const User = require("../models/userModel");

const getVendors = async (req, res) => {
  try {
     // This code is added to verify a specific user can create read update and delete the vendor's account
    const vendor = await Vendor.find({ user: req.user.id });
    // const vendor = await Vendor.find();
    res.status(200).json({ data: vendor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOneVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json({ data: vendor });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const createVendors = async (req, res) => {
  if (!req.body.Bank_Account_No) {
    res.status(400).json({ message: "Please add a account Number" });
  }
  try {
    const vendor = await Vendor.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVendors = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      res.status(400);
      throw new Error("Please Enter a Valid Id");
    }

    // This code is added to verify a specific user can read and update the vendor's account
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (vendor.user.toString() !== user.id) {
      
      res.status(401)
      throw new Error('User not authorized')
    }

    const updateVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updateVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVendors = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(400);
      throw new Error("Please Enter a Valid Id");
    }
    // This code is added to verify a specific user can delete the vendor's account
    const user = await User.findById(req.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (vendor.user.toString() !== user.id) {
      
      res.status(401)
      throw new Error('User not authorized')
    }

    vendor.remove();
    res.status(200).json({ message: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getVendors,
  createVendors,
  updateVendors,
  deleteVendors,
  getOneVendor,
};

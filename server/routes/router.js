/** @format */

const express = require("express");
const router = express.Router();
const Products = require("../models/productsSchema");

// get all products
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    res.status(201).json(productsdata);
  } catch (error) {
    res.status(400).json(productsdata);

    console.log(error.message);
  }
});

// get individual products

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id---", id);
    const individualData = await Products.findOne({ id: id });
    // console.log(individualData, `dddd`);
    res.status(201).json(individualData);
  } catch (error) {
    res.status(400).json(error);
    console.log(error.message);
  }
});

module.exports = router;

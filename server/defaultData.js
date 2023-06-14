/** @format */

const Products = require("./models/productsSchema");
const productsData = require("./constant/productsData");

const defaultData = async () => {
  try {
    await Products.deleteMany({});

    const storeData = await Products.insertMany(productsData);
    // console.log(storeData);
  } catch (error) {
    console.log("error" + error.message);
  }
};
module.exports = defaultData;

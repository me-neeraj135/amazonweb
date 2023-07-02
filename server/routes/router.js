/** @format */

const express = require("express");
const router = express.Router();
const PRODUCTS = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/authentication");
// get all products
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await PRODUCTS.find();
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
    const individualData = await PRODUCTS.findOne({ id: id });
    // console.log(individualData, `dddd`);
    res.status(201).json(individualData);
  } catch (error) {
    res.status(400).json(error);
    console.log(error.message);
  }
});

// register user

router.post("/register", async (req, res) => {
  // console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all data" });
    console.log("no data available");
  }

  try {
    const preUser = await USER.findOne({ email: email });
    if (preUser) {
      res.status(422).json({ error: "user already registered" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password not matched" });
    } else {
      const finalUser = await new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });
      const storeData = await finalUser.save();
      console.log(storeData);
      res.status(201).json(storeData);
    }
  } catch (error) {}
});

// login user

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400).json({ error: `email and  password is required` });
  }

  try {
    const userLogin = await USER.findOne({ email: email });
    // console.log(userLogin);

    if (userLogin) {
      const isMatched = await bcrypt.compare(password, userLogin.password);

      // token generate

      const token = await userLogin.generateAuthToken();

      res.cookie("Amazonweb", token, {
        expires: new Date(Date.now() + 2589000),
        httpOnly: true,
      });
      console.log(token, `----token`);

      if (!isMatched) {
        res.status(400).json({ error: `incorrect password` });
      } else {
        res.status(201).json(userLogin);
      }
    } else {
      res.status(400).json({ error: `invalid details` });
    }
  } catch (error) {
    res.status(400).json({ error: "user not exist" });
  }
});

// add items into cart

router.post("/addToCart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await PRODUCTS.findOne({ id: id });
    console.log(cart, `---cart-value`);

    const userContact = await USER.findOne({ _id: req.userID });

    if (userContact) {
      const cartData = await userContact.addCart(cart);
      await userContact.save();
      console.log(cartData);
      res.status(201).json(userContact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
  }
});

// get cart details

router.get("/cartDetails", authenticate, async (req, res) => {
  try {
    const buyUser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyUser);
  } catch (error) {
    console.log(error, `cartDetails-error`);
  }
});

// user validation

router.get("/validateUser", authenticate, async (req, res) => {
  try {
    const validUserOne = await USER.findOne({ _id: req.userID });
    res.status(201).json(validUserOne);
  } catch (error) {
    console.log(error, `user-validation-error`);
  }
});

// delete item from cart

router.delete("/removeItem/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter(cv => {
      return cv.id !== id;
    });
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log(`item remove`);
  } catch (error) {
    console.log(error, `error--remove item`);
    res.status(400).json(req.rootUser);
  }
});

// logout User

router.get("/logout", authenticate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter(cv => {
      return cv.token !== req.token;
    });
    res.clearCookie("Amazonweb", { path: "/" });

    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
  } catch (error) {
    console.log(error);
    res.status(400).json(req.rootUser.tokens);
  }
});

module.exports = router;

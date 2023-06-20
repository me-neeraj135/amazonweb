/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secreteKey = process.env.KEY;

const userSchema = new Schema({
  fname: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email address");
      }
    },
  },
  mobile: { type: String, required: true, unique: true, maxlength: 10 },
  password: { type: String, required: true, minlength: 6 },
  cpassword: { type: String, required: true, minlength: 6 },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: [],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.cpassword = await bcrypt.hash(this.cpassword, 10);
  }
  next();
});

// generate token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, secreteKey, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// add item into Cart

userSchema.methods.addCart = async function (cart) {
  try {
    this.carts = this.carts.concat(cart);
    await this.save();
    return this.carts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);

/** @format */

require(`dotenv`).config();
const express = require(`express`);

const mongoose = require("mongoose");
require("./db/conn");

let Products = require(`./models/productsSchema`);
let defaultData = require(`./defaultData`);
const cors = require(`cors`);
const port = 8005;
const router = require("./routes/router");
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
defaultData();

/** @format */

import { getProductsReducers } from "./Productsreducers";
import { combineReducers } from "redux";
const rootReducers = combineReducers({ getProductData: getProductsReducers });

export default rootReducers;

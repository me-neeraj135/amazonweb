/** @format */

import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css";
import Slide from "./Slide";

import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

function Maincomp() {
  const { products } = useSelector(state => state.getProductData);
  console.log("products---", products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal Of The Day" products={products} />
        </div>
        <div className="right_slide">
          <h4>Festive latest launches</h4>
          <img
            src="https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
          <a href="#">see more</a>
        </div>
      </div>
      <Slide title="Today's deal" products={products} />
      <div className="center_img">
        <img src="./amzon_banner.jpg" alt="" />
      </div>
      <Slide title="Best seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
}

export default Maincomp;

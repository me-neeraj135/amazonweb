/** @format */

import React, { useState, useEffect } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";

function BuyNow() {
  const [cartData, setCartData] = useState("");
  // console.log(cartData.carts, `cart-data`);
  const getBuyData = async () => {
    const res = await fetch("/cartDetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      console.log(`error`);
    } else {
      setCartData(data.carts);
    }
  };

  useEffect(() => {
    getBuyData();
  }, []);

  return (
    <>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>select all Items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />

              {cartData.map((elm, k) => {
                return (
                  <>
                    <div className="item_containert">
                      <img src={elm.detailUrl} alt={elm.shortTitle} />
                      <div className="item_details">
                        <h3>{elm.title.longTitle} </h3>
                        <h3>{elm.title.shortTitle}</h3>
                        <h3 className="diffrentprice">$4049.00</h3>
                        <p className="unusuall">Usually dispatched in 8 days</p>
                        <p>Eligible for Free shipping</p>
                        <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        />
                        <Option deleteData={elm.id} get={getBuyData} />
                      </div>
                      <h3 className="item_price">${elm.price.cost}</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

              <Subtotal item={cartData} />
            </div>
            <div className="right_buy">
              <Right item={cartData} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BuyNow;

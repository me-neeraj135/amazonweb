/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";

import "./cart.css";

function Cart() {
  const { id } = useParams("");
  const history = useNavigate("");
  console.log(id, `id`);
  const { account, setAccount } = useContext(LoginContext);
  const [indData, setIndData] = useState([]);

  console.log(indData, `ind-data`);
  const getIndData = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status !== 201) {
      console.log(`no data`);
    } else {
      console.log(`get data`);
      setIndData(data, `get-data`);
    }
  };

  useEffect(() => {
    getIndData();
  }, [id]);

  // add cart

  const addToCart = async id => {
    const checkRes = await fetch(`/addToCart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ indData }),
      credentials: "include",
    });

    const data1 = await checkRes.json();
    console.log(data1, `frontend --data`);

    if (checkRes.status === 401 || !data1) {
      console.log(`user invalid`);
      alert(`user invalid`);
    } else {
      // alert(`data added in cart`);
      setAccount(data1);
      history("/buyNow");
    }
  };

  return (
    <div className="cart_section">
      {indData && Object.keys(indData).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={indData.detailUrl} alt="cart_img" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => {
                  addToCart(indData.id);
                }}
              >
                Add to cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{indData.title.shortTitle}</h3>
            <h4>{indData.title.longTitle}</h4>
            <Divider />
            <p className="mrp">MRP : ${indData.price.mrp}</p>
            <p>
              Deal of the Day{" "}
              <span style={{ color: "#B12704" }}>${indData.price.cost}</span>{" "}
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                ${indData.price.mrp - indData.price.cost} (
                {indData.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount : <span style={{ color: "#111 " }}></span>{" "}
                {indData.price.discount}
              </h5>
              <h4>
                Free Delivery:{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Oct 8 -22
                </span>{" "}
                Details
              </h4>
              <p>
                Fatest delivery :
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11AM
                </span>{" "}
              </p>
            </div>
            <p className="description">
              About the Item :
              <span
                style={{ color: "#565959", fontSize: "14", fontWeight: 500 }}
              >
                {indData.description}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

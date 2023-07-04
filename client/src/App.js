/** @format */

import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./ components/header/navbar/Navbar";
import NewNav from "./ components/newNav/NewNav";
import Maincomp from "./ components/home/Maincomp";
import Cart from "./ components/cart/Cart";
import BuyNow from "./ components/buynow/BuyNow";
import Footer from "./ components/footer/Footer";
import SignIn from "./ components/signup_signin/Sign_in";
import SignUp from "./ components/signup_signin/SignUp";

import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <NewNav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getProductsOne/:id" element={<Cart />} />
            <Route path="/buyNow" element={<BuyNow />} />
          </Routes>

          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;

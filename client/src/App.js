/** @format */

import "./App.css";
import Navbar from "./ components/header/navbar/Navbar";
import NewNav from "./ components/newNav/NewNav";
import Maincomp from "./ components/home/Maincomp";
import Cart from "./ components/cart/Cart";
import BuyNow from "./ components/buynow/BuyNow";

import Footer from "./ components/footer/Footer";

import SignIn from "./ components/signup_signin/Sign_in";
import SignUp from "./ components/signup_signin/SignUp";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <NewNav />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getProductsOne/:id" element={<Cart />} />
        <Route path="/buynow" element={<BuyNow />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

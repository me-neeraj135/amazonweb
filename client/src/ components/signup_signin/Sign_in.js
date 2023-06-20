/** @format */

import React, { useState, useContext } from "react";
import "./signUp.css";

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoginContext } from "../context/ContextProvider";
function Sign_in() {
  const [logData, setData] = useState({
    email: "",
    password: "",
  });
  const { account, setAccount } = useContext(LoginContext);

  const addData = e => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };

  const sentData = async e => {
    e.preventDefault();
    const { email, password } = logData;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    console.log(data);

    if (res.status === 400 || !data) {
      toast.warn("  email and password is required ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("user successfully login", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAccount(data);
      setData({ ...logData, email: "", password: "" });
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonLogo" />
          </div>
          <div className="sign_form">
            <form action="POST">
              <h1>sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  onChange={addData}
                  value={logData.email}
                  type="text"
                  name="email"
                  id="email"
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  onChange={addData}
                  value={logData.password}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
              <button type="submit" onClick={sentData} className="signin_btn">
                Continue
              </button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create your amazon account</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default Sign_in;

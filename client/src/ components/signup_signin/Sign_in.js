/** @format */

import React, { useState } from "react";
import "./signUp.css";

import { NavLink } from "react-router-dom";

function Sign_in() {
  const [logData, setData] = useState({
    email: "'",
    password: "",
  });

  const addData = e => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonLogo" />
          </div>
          <div className="sign_form">
            <form action="">
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
              <button className="signin_btn">Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register">
              <button>Create your amazon account</button>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default Sign_in;

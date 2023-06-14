/** @format */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  const [uData, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const addData = e => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...uData,
        [name]: value,
      };
    });

    // console.log(uData);
  };
  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonLogo" />
        </div>
        <div className="sign_form">
          <form action="">
            <h1>sign-Up</h1>
            <div className="form_data">
              <label htmlFor="fname">your name</label>
              <input
                onChange={addData}
                value={uData.fname}
                type="text"
                name="fname"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                onChange={addData}
                value={uData.email}
                type="text"
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">mobile</label>
              <input
                onChange={addData}
                value={uData.mobile}
                type="text"
                name="mobile"
                id="mobile"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                onChange={addData}
                value={uData.password}
                type="password"
                name="password"
                placeholder="At least 6 character"
                id="password"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                onChange={addData}
                value={uData.cpassword}
                type="password"
                name="cpassword"
                id="cpassword"
              />
            </div>
            <button className="signin_btn">Continue</button>
            <div className="signin_info">
              <p>Already have an account ?</p>
              <NavLink to="/login">SignIn</NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

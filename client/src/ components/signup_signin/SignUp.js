/** @format */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const sendData = async e => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = uData;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname, email, mobile, password, cpassword }),
    });

    const data = await res.json();
    console.dir(res, `ddd`);
    if (!res.ok || !data) {
      toast.warn(" no data added ", {
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
      toast.success("data successfully added ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUdata({
        ...uData,
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonLogo" />
        </div>
        <div className="sign_form">
          <form action="POST">
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
            <button type="submit" className="signin_btn" onClick={sendData}>
              Continue
            </button>
            <div className="signin_info">
              <p>Already have an account ?</p>
              <NavLink to="/login">SignIn</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}

export default SignUp;

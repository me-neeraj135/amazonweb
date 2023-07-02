/** @format */

import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";

import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import "./rightHeader.css";
function RightHeader({ logClose }) {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avatar"></Avatar>
          )}
          {account ? <h3>Hello ,{account.fname.toUpperCase()}</h3> : ""}
        </div>
        <div className="nav_btn" onClick={() => logClose()}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/">Shop By category</NavLink>
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <NavLink to="/">Today's deal</NavLink>
          {account ? (
            <NavLink to="/buyNow">your orders</NavLink>
          ) : (
            <NavLink to="/login">your orders</NavLink>
          )}
          <Divider style={{ width: "100%", marginLeft: "-20px" }} />
          <div className="flag">
            <NavLink to="/login">Settings</NavLink>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RightHeader;

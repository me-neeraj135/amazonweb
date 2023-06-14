/** @format */

import React from "react";
import "../navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="left">
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="amazon_logo" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input type="text" name="" id="" />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signIn</NavLink>
          </div>
          <div className="cart_btn">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon id="icon" />
            </Badge>
            <p>cart</p>
          </div>
          <Avatar className="avatar" />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

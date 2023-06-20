/** @format */

import React, { useContext, useEffect } from "react";
import "../navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);

  const getValidUser = async () => {
    const res = await fetch("/validateUser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data, `valid-u`);
    if (res.status !== 201) {
      console.log(`error`);
    } else {
      setAccount(data);
    }
  };

  useEffect(() => {
    getValidUser();
  }, []);

  console.log(account, `--account`);
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
            {account ? (
              <NavLink to="/buyNow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <p>cart</p>
          </div>
          {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avatar"></Avatar>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

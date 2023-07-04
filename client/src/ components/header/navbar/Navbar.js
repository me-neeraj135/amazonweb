/** @format */

import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "../navbar.css";

import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import RightHeader from "../RightHeader";
import { LoginContext } from "../../context/ContextProvider";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  console.log(text, `search-text`);

  const [listOpen, setListOpen] = useState(true);
  const { products } = useSelector(state => state.getProductData);

  // console.log(products, `ppppp`);

  const [drOpen, setDrOpen] = useState(false);

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
  const handleOpen = () => {
    setDrOpen(true);
  };

  const DrawerClose = () => {
    setDrOpen(false);
  };

  // user-logout

  const logoutUser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    // console.log(data2, `valid-u`);

    if (res2.status !== 201) {
      console.log(`error`);
    } else {
      toast.success("user successfully logout", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setAccount(false);
      history("/");
    }
  };

  const getText = items => {
    setText(items);
    setListOpen(false);
  };

  useEffect(() => {
    getValidUser();
  }, []);

  console.log(account, `--account`);
  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: `#fff` }} />
          </IconButton>
          <Drawer open={drOpen} onClose={DrawerClose}>
            <RightHeader logClose={DrawerClose} logoutUser={logoutUser} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="./amazon_PNG25.png" alt="amazon_logo" />
            </NavLink>
          </div>
          <div className="nav_searchbar">
            <input
              onChange={e => {
                getText(e.target.value);
              }}
              type="text"
              name=""
              id=""
              placeholder="search your products"
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {/* search products */}

            {text && (
              <List className="extrasearch " hidden={listOpen}>
                {products
                  .filter(product =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map(product => {
                    return (
                      <ListItem>
                        <NavLink
                          to={`/getProductsOne/${product.id}`}
                          onClick={() => {
                            setListOpen(true);
                          }}
                        >
                          {product.title.longTitle}
                        </NavLink>
                      </ListItem>
                    );
                  })}
              </List>
            )}
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
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avatar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>

            {account ? (
              <MenuItem onClick={(handleClose, logoutUser)}>
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
          <ToastContainer />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

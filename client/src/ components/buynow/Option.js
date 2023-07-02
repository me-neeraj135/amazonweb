/** @format */

import React, { useContext } from "react";

import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Option({ deleteData, get }) {
  const { account, setAccount } = useContext(LoginContext);

  const removeItem = async (req, res) => {
    try {
      const res = await fetch(`/removeItem/${deleteData}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      console.log(data, `item-delete`);
      if (res.status === 400 || !data) {
        console.log(`item not remove`);
      } else {
        console.log(`item remove`);
        setAccount(data);
        toast.success("Item removed", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        get();
      }
    } catch (error) {}
    console.log("error");
  };
  return (
    <div className="add_remove_select">
      <select>
        <option value="">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={removeItem}>
        Delete
      </p>{" "}
      <span>|</span>
      <p className="forremovemedia">Save or Later</p> <span>|</span>
      <p className="forremovemedia">See more like this</p>
      <ToastContainer />
    </div>
  );
}

export default Option;

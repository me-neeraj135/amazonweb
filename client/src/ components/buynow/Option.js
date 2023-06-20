/** @format */

import React from "react";

function Option({ deleteData, get }) {
  const removeItem = async (req, res) => {
    try {
      const res = await fetch("/removeItem", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const deletedItem = await res.json();

      console.log(deletedItem, `item-delete`);
      if (res.status === 400 || !deletedItem) {
        console.log(`item not remove`);
      } else {
        console.log(`item remove`);
      }
    } catch (error) {}
  };
  return (
    <div className="add_remove_select">
      <select>
        <option value="">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }}>Delete</p> <span>|</span>
      <p className="forremovemedia">Save or Later</p> <span>|</span>
      <p className="forremovemedia">See more like this</p>
    </div>
  );
}

export default Option;

import React, { useState } from "react";
import "./Checkout.css";

const handleAddSub = ({ type, setPrice }) => {

  setPrice((prev) => {
    if (type === "add") {
      return prev + 1;
    }
    if (type === "sub") {
      return prev - 1;
    }
  });
};

export const Checkout = () => {
  const [price, setPrice] = useState(1);

  return (
    <div className="PaymnentAside">
      <p>R{price}</p>

      <div>
        <div className="quantityControl">
          <button
            className="rounded btn"
            onClick={() => {
              handleAddSub({ type: "sub", setPrice });
            }}
          >
            -
          </button>
          <p>1</p>
          <button
            className="rounded btn"
            onClick={() => {
              handleAddSub({ type: "add", setPrice });
            }}
          >
            +
          </button>
        </div>
        <button className="addBtn">Add to cart</button>
      </div>
    </div>
  );
};

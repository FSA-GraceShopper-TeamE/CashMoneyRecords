import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Total() {
  const cart = useSelector((state) => state.persistedReducer.cart);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const navigate = useNavigate();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  const handleCheckout = () => {
    isLoggedIn ? navigate("/checkout") : navigate("/login");
  };

  return (
    <div className="total">
      <h2>ORDER SUMMARY</h2>
      <div>
        <p className="total__p">
          total ({getTotal().totalQuantity} items) :{" "}
          <strong>${getTotal().totalPrice}</strong>
        </p>
      </div>
      <button className="total__button" onClick={() => handleCheckout()}>
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
}

export default Total;

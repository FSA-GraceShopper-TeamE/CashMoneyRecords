import React, { useEffect, useState } from "react";
import Total from "./TotalCart";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.persistedReducer.cart);

  return (
    <div className="cart">
      <div className="cart__left">
        <div>
          <h3>Shopping Cart</h3>
          {cart?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
      <div className="cart__right">
        <Total />
      </div>
    </div>
  );
};

export default Cart;

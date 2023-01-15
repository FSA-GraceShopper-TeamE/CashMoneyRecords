import React, { useEffect, useState } from "react";

// import "./cart.css";
import Total from "./TotalCart";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
    const cart = useSelector((state) => state.persistedReducer.cart);
    const {id, title, artistName, price, quantity } = cart
   console.log({title})
   console.log(title)
   console.log(cart)

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
}

export default Cart;










// import React from "react";
// import { addToCartAsync, selectCart } from './cartSlice'
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom"; // probaly wont need link


// const Cart = () => {

//     const dispatch = useDispatch();
//     const cart = useSelector(selectCart);

//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {


//     }


//     return (
//       <div className="home">
//         <div className="cart-container">
//           <h2>{`Subtotal $${total}`}</h2>
//           {completed ? (
//             <CompletedOrder orderId={orderId} />
//           ) : checkout ? (
//             <Checkout
//               orderId={orderId}
//               toggleCheckout={this.toggleCheckout}
//               updateInfo={updateInfo}
//               getOrder={getOrder}
//             />
//           ) : (
//             <Button onClick={this.toggleCheckout}>Checkout</Button>
//           )}
//           <div className="albums-view">
//             {inventory.map((item) => {
//               const { id, price, quantity, album } = item;
//               const { image, title, artistName } = album;
//               return (
//                 <CartAlbumCard
//                   key={id}
//                   id={auth.id ? id : album.id}
//                   price={price}
//                   qty={quantity}
//                   image={image}
//                   title={title}
//                   artistName={artistName}
//                   handleQtyChange={this.handleQtyChange}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     );


// }

// export default Cart;

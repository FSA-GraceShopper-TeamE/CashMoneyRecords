import React from "react";
import { addToCartAsync, selectCart } from './cartSlice'
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom"; // probaly wont need link


const Cart = () => {





    return (
      <div className="home">
        <div className="cart-container">
          <h2>{`Subtotal $${total}`}</h2>
          {completed ? (
            <CompletedOrder orderId={orderId} />
          ) : checkout ? (
            <Checkout
              orderId={orderId}
              toggleCheckout={this.toggleCheckout}
              updateInfo={updateInfo}
              getOrder={getOrder}
            />
          ) : (
            <Button onClick={this.toggleCheckout}>Checkout</Button>
          )}
          <div className="albums-view">
            {inventory.map((item) => {
              const { id, price, quantity, album } = item;
              const { image, title, artistName } = album;
              return (
                <CartAlbumCard
                  key={id}
                  id={auth.id ? id : album.id}
                  price={price}
                  qty={quantity}
                  image={image}
                  title={title}
                  artistName={artistName}
                  handleQtyChange={this.handleQtyChange}
                />
              );
            })}
          </div>
        </div>
      </div>
    );


}

export default Cart;

import React from "react";
import "./Cart.css";

const Cart = ({ cart }) => {
  // props receivie na kore prps er ekhanei destructing kore neya jay

  //   const cart = props.cart; //option 1
  //   const { cart } = props; //option 2
  //   console.log(cart);

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    product.quantity = product.quantity || 1;

    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }
  const totalTax = totalPrice * 0.7;
  const grantTotal = totalPrice + totalShipping;

  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected items: {quantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <p>Total Shipping: ${totalShipping.toFixed(2)}</p>
      <p>Tax: ${totalTax.toFixed(2)}</p>
      <h6>Grand Total: ${grantTotal.toFixed(2)}</h6>
    </div>
  );
};

export default Cart;

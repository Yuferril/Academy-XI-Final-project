import * as React from "react";
import { Button } from "@mui/material";
import CartItem from "./CartItem";
import styled from "styled-components";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { UserContext } from "../Store";
import { isEmpty } from "lodash";
import AccountCircle from "@mui/icons-material/AccountCircle";


export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
`;

export const calculateTotal = (items) =>
  items.reduce((acc, item) => acc + item.amount * item.price, 0);

const Cart = ({ addToCart, removeFromCart, handleCheckout, handleLogin }) => {
  const userDetail = React.useContext(UserContext);
  const { cartItems, user } = userDetail;

  const getTotal = () => {
    const total = calculateTotal(cartItems).toFixed(2);
    return total;
  };

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      <h2>Total: ${cartItems.length === 0 ? 0 : getTotal()}</h2>
      {!isEmpty(user.username) ? (
        <Button
          variant="outlined"
          startIcon={<ShoppingBasketIcon />}
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AccountCircle />}
          onClick={handleLogin}
          disabled={cartItems.length === 0}
        >
          Please Login / Sign up for Check out
        </Button>
      )}
    </Wrapper>
  );
};

export default Cart;

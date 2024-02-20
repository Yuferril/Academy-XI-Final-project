import {  useContext, useEffect, useState} from "react";
import { Card, CardContent, Box } from "@mui/material";
import { toFirstCharUppercase } from "../Cart/PokeCard";
import styled from "styled-components";
import { UserContext } from "../Store";

export const WrapperOut = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;

const styles = {
  cardImg: {
    height: "200px",
    width: "200px",
    margin: "auto",
  },
};

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const userDetail = useContext(UserContext);

  useEffect(() => {
    if (userDetail && userDetail.user && userDetail.user.id) {
      fetch(`users/${userDetail.user.id}/orders`)
        .then((response) => response.json())
        .then((data) => setOrderHistory(data))
        .catch((error) =>
          console.error("Error fetching order history:", error)
        );
    }
  }, [userDetail]);

  const getGrandTotal = (order) => {
    const result = order.order_items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    return result.toFixed(2);
  };
  return (
    <WrapperOut>
      <h2>Your Order History</h2>
      <div style={{}}>
        {orderHistory.length > 0 ? (
          orderHistory.map((order, i) => {
            return (
              <Card
                key={order.id}
                style={{
                  backgroundColor: "lightgray",
                  margin: "20px",
                  border: "1px solid black",
                  minWidth: "200px",
                  minHeight: "200px",
                }}
              >
                <CardContent>
                  <h3>
                    {i + 1}. Order Number: {order.id}
                  </h3>
                  Order date:{" "}
                  {order.created_at.substr(0, order.created_at.indexOf("T"))}
                  {order.order_items.length > 0 ? (
                    <>
                      {order.order_items.map((item, i) => (
                        <div key={i} className="information">
                          <h4>
                            {i + 1}.{toFirstCharUppercase(item.name)}
                          </h4>
                          <img src={item.sprite} alt={item.name} />
                          <p>Price: ${item.price}</p>
                          <p>Quantity: {item.quantity}x</p>
                          <p>
                            Total: ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                      <div>
                        <h3>Grand Total:</h3>
                        <p>
                          {" "}
                          <b> $ {getGrandTotal(order)} </b>
                        </p>
                      </div>
                    </>
                  ) : (
                    <p>No items found in this order.</p>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>No order history found.</p>
        )}
      </div>
    </WrapperOut>
  );
};

export default OrderHistory;

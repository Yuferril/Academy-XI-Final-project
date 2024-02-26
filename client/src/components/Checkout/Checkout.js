import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Copyright from "../Common/Copyright";
import { UserContext } from "../Store";
import { isEmpty } from "lodash";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { user, cartItems, updateCartItem, updateUser } =
    useContext(UserContext);

  // const handlePostOrder = (item) => {
  //   return {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       pokemon_id: item.id,
  //       name: item.name,
  //       quantity: item.amount,
  //       price: item.price,
  //       sprite: item.sprite,
  //     }),
  //   };
  // };

  const handleDisabledButton = () => {
    let disabled = false;

    if (activeStep === 0) {
      disabled =
        isEmpty(user.firstName) ||
        isEmpty(user.lastName) ||
        isEmpty(user.address) ||
        isEmpty(user.city) ||
        isEmpty(user.state) ||
        isEmpty(user.postcode) ||
        isEmpty(user.country);
    } else if (activeStep === 1) {
      disabled =
        isEmpty(user.ccname) ||
        isEmpty(user.ccnumber) ||
        isEmpty(user.ccexp) ||
        isEmpty(user.cccvv);
    }

    return disabled;
  };

  const handleNext = async () => {
    try {
      const orderData = {
        address: user.address,
        postal_code: user.postcode,
        state: user.state,
        country: user.country,
        city: user.city,
        credit_card_name: user.ccname,
        credit_card_number: user.ccnumber,
        credit_card_expiry: user.ccexp,
        user_id: user.id,
      };

      const orderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: orderData }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const order = await orderResponse.json();

      // cartItems.forEach(async (item) => {
      //   await fetch(`http://localhost:3000/orders/${order.id}/order_items`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       pokemon_id: item.id,
      //       name: item.name,
      //       quantity: item.amount,
      //       price: item.price,
      //       sprite: item.sprite,
      //     }),
      //   });
      // });

      const orderItemsList = cartItems.map((item) => ({
        pokemon_id: item.id,
        name: item.name,
        quantity: item.amount,
        price: item.price,
        sprite: item.sprite,
      }));

      await fetch(`http://localhost:3000/orders/${order.id}/order_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_items_list: orderItemsList }),
      });

      setActiveStep(activeStep + 1);
      updateCartItem([]);
      updateUser({ ...user, order_id: order.id, cccvv: null });
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Hi {user.username}, Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{user.order_id ?? "2001539"}. We have
                emailed your order confirmation, and will send you an update
                when your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  disabled={handleDisabledButton()}
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handleNext
                      : () => setActiveStep(activeStep + 1)
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}

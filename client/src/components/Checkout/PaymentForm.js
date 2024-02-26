import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { UserContext } from "../Store";
import { isEmpty } from "lodash";

export default function PaymentForm() {
  const userDetail = React.useContext(UserContext);
  const { user, updateUser } = userDetail;
  console.log("hwel", user.ccnumber);
  const [ccNum, setCcNum] = React.useState(
    !isEmpty(user.ccnumber) ? user.ccnumber.replace(/\D/g, "") : ""
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={!user.ccname}
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            helperText={!user.ccname ? "Required Field" : ""}
            variant="standard"
            defaultValue={user.ccname}
            onChange={(e) => updateUser({ ...user, ccname: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={!ccNum}
            helperText={!ccNum ? "Required Field, Number only" : ""}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            defaultValue={ccNum.length > 0 ? user.ccnumber : ccNum}
            onChange={(e) => {
              setCcNum(e.target.value);
              let cc = "";
              if (e.target.value.length >= 4) {
                cc = "xxxx-xxxx-xxxx-" + e.target.value.substring(-4, 4);
              }
              updateUser({
                ...user,
                ccnumber: cc,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            error={!user.ccexp}
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            defaultValue={user.ccexp}
            helperText={!user.ccexp ? "Required Field" : ""}
            onChange={(e) =>
              updateUser({
                ...user,
                ccexp: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            error={!user.cccvv}
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={(e) =>
              updateUser({
                ...user,
                cccvv: !isEmpty(e.target.value) ? "xx" : "",
              })
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

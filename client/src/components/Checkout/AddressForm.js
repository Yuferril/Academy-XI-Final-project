import * as React from "react";
import { UserContext } from "../Store";
import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
import { countries } from "../Common/Country";

export default function AddressForm() {
  const userDetail = React.useContext(UserContext);
  const { user, updateUser } = userDetail;
  const [valueCountry, setValueCountry] = React.useState(user.country);
  const [inputValueCountry, setInputValueCountry] = React.useState("");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!user.firstName}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={user.firstName}
            helperText={!user.firstName ? "Required Field" : ""}
            onChange={(e) => {
              updateUser({
                ...user,
                firstName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={!user.lastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={user.lastName}
            helperText={!user.lastName ? "Required Field" : ""}
            onChange={(e) => {
              updateUser({
                ...user,
                lastName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={!user.address}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={user.address}
            helperText={!user.address ? "Required Field" : ""}
            onChange={(e) => {
              updateUser({
                ...user,
                address: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={!user.city}
            helperText={!user.city ? "Required Field" : ""}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
            variant="standard"
            defaultValue={user.city}
            onChange={(e) => {
              updateUser({
                ...user,
                city: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!user.state}
            id="state"
            helperText={!user.state ? "Required Field" : ""}
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={user.state}
            required
            onChange={(e) => {
              updateUser({
                ...user,
                state: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!user.postcode}
            helperText={!user.postcode ? "Required Field" : ""}
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            defaultValue={user.postcode}
            onChange={(e) => {
              updateUser({
                ...user,
                postcode: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            value={valueCountry}
            onChange={(event, newValue) => {
              setValueCountry(newValue);
              updateUser({
                ...user,
                country: newValue,
              });
            }}
            inputValue={inputValueCountry}
            onInputChange={(event, newInputValue) => {
              setInputValueCountry(newInputValue);
            }}
            disablePortal
            id="country"
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!user.country}
                label="Country"
                required
                helperText={!user.country ? "Required Field" : ""}
              />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

import * as React from "react";
import { pokemonType, pokemonName } from "./Common/PokemonDetails";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  TextField,
  Container,
  InputAdornment,
  Paper,
  Autocomplete,
  Button,
} from "@mui/material";
import { styles } from "./Cart/PokeCard";
import { toFirstCharUppercase } from "./Cart/PokeCard";
import Notification from "./Notification/Notification";

function handleAddNewPokemon({ pokemon, handleSuccess, handleError }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: pokemon.name,
      description: pokemon.description,
      element_type: pokemon.element_type,
      price: pokemon.price,
    }),
  };

  fetch("http://localhost:3000/pokemons", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.name) {
        handleSuccess();
      } else {
        handleError(data.errors[0]);
      }
    });
}

function handleEditPokemon({ pokemon, handleSuccess, handleError }) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: pokemon.name,
      description: pokemon.description,
      element_type: pokemon.element_type,
      price: pokemon.price,
    }),
  };

  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.message.includes("successfully updated")) {
        handleSuccess();
      } else {
        handleError(data.error);
      }
    });
}

const handleDeletePokemon = ({ pokemon, handleSuccess, handleError }) => {
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message.includes("deleted successfully")) {
        handleSuccess();
      } else {
        handleError();
      }
    });
};

export default function PokeEdit({
  isAdd = false,
  isEdit = false,
  isDelete = false,
  handleClose,
  pokemonData,
}) {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [pokemon, setPokemon] = React.useState(
    isEdit || isDelete
      ? {
          ...pokemonData,
        }
      : {}
  );
  const [valueType, setValueType] = React.useState(
    (isEdit || isDelete) && pokemonData.element_type
      ? toFirstCharUppercase(pokemonData.element_type)
      : ""
  );
  const [inputValueType, setInputValueType] = React.useState("");

  const [valueName, setValueName] = React.useState(
    (isEdit || isDelete) && pokemonData.name
      ? toFirstCharUppercase(pokemonData.name)
      : ""
  );
  const [inputValueName, setInputValueName] = React.useState("");

  const handleSuccess = (message, additionalStep = () => {}) => {
    setIsAlertOpen(true);
    setIsSuccess(true);
    setMessage(message);
    additionalStep();
  };

  const handleError = (message) => {
    setIsAlertOpen(true);
    setIsSuccess(false);
    setMessage(message);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h6" gutterBottom>
            {isAdd
              ? "Add new Pokemon"
              : isEdit
              ? `Edit ${pokemonData.name} Data`
              : `Delete ${pokemonData.name} Data ?`}
          </Typography>
          <Grid container spacing={3}>
            {(isEdit || isDelete) && (
              <Grid item xs={12} sm={12}>
                <CardMedia
                  className="Card"
                  image={pokemonData?.sprite}
                  style={styles.cardImg}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={valueName}
                onChange={(event, newValue) => {
                  setValueName(newValue);
                  setPokemon({
                    ...pokemon,
                    name: newValue,
                  });
                }}
                inputValue={inputValueName}
                onInputChange={(event, newInputValue) => {
                  setInputValueName(newInputValue);
                }}
                disablePortal
                disabled={isDelete}
                id="pokename"
                options={pokemonName}
                renderInput={(params) => (
                  <TextField {...params} label="Name" required />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Autocomplete
                value={valueType}
                onChange={(event, newValue) => {
                  setValueType(newValue);
                  setPokemon({
                    ...pokemon,
                    element_type: newValue,
                  });
                }}
                inputValue={inputValueType}
                onInputChange={(event, newInputValue) => {
                  setInputValueType(newInputValue);
                }}
                disablePortal
                disabled={isDelete}
                id="poketype"
                options={pokemonType}
                renderInput={(params) => (
                  <TextField {...params} label="Type" required />
                )}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                label="Price"
                id="Price"
                disabled={isDelete}
                onChange={(e) => {
                  setPokemon({
                    ...pokemon,
                    price: e.target.value,
                  });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                variant="standard"
                defaultValue={isEdit || isDelete ? pokemonData.price : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                label="Description"
                disabled={isDelete}
                fullWidth
                autoComplete="description"
                variant="standard"
                required
                onChange={(e) => {
                  setPokemon({
                    ...pokemon,
                    description: e.target.value,
                  });
                }}
                defaultValue={isEdit || isDelete ? pokemonData.description : ""}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={() => {
                if (isAdd) {
                  handleAddNewPokemon({
                    pokemon,
                    handleSuccess: () =>
                      handleSuccess(`Successfully Added ${pokemon.name}`),
                    handleError: (message) =>
                      handleError(message ?? `Failed Added ${pokemon.name}`),
                  });
                } else if (isEdit) {
                  handleEditPokemon({
                    pokemon,
                    handleSuccess: () =>
                      handleSuccess(`Successfully Updated ${pokemon.name}`),
                    handleError: (message) =>
                      handleError(message ?? `Failed Updated ${pokemon.name}`),
                  });
                } else {
                  handleDeletePokemon({
                    pokemon,
                    handleSuccess: () =>
                      handleSuccess(
                        `Successfully Deleted ${pokemon.name}`,
                        handleClose
                      ),
                    handleError: (message) =>
                      handleError(message ?? `Failed Deleted ${pokemon.name}`),
                  });
                }
              }}
              sx={{ mt: 3, ml: 1 }}
            >
              {isAdd ? "Add new " : isEdit ? "Edit " : "Delete "} Pokemon
            </Button>
          </Box>
        </Paper>
        <Notification
          isOpen={isAlertOpen}
          handleClose={() => setIsAlertOpen(false)}
          message={message}
          isSuccess={isSuccess}
        />
      </Container>
    </React.Fragment>
  );
}

import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  CircularProgress,
  IconButton,
  Button,
  Dialog,
  AppBar,
  Toolbar,
} from "@mui/material";
import NavBar from "./NavBar/NavigationBar";
import EditIcon from "@mui/icons-material/BorderColor";
import { getPokemonCard } from "./Cart/PokeCard";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import PokeEdit from "./PokeEdit";
import { handleFetchPokemon } from "../data/DataFetching";
import { isEmpty, last } from "lodash";

export const UserContext = React.createContext();

const Pokedex = () => {
  const [pokemonCompleteData, setPokemonCompleteData] = useState([]);
  const [filter, setFilter] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [userState, setUserState] = useState({
    username: null,
    role: "user",
    country: "Australia",
  });

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddToCart = (clickedItem) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.name === clickedItem.name);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [])
    );
  };

  const handleLogin = (userData) => {
    // console.log("userData", userData);
    setUserState({
      ...userData,
      country: userData.country ?? "Australia",
      ccexp: userData.ccexp ?? "12/2024",
      city: userData.city ?? "Melbourne",
      state: userData.state ?? "Vic",
    });
  };

  const handleLogout = () => {
    setUserState({
      username: null,
      role: "user",
    });

    setCartItems([]);
  };

  const handleEdit = (pokeData) => {
    setSelectedPokemon(pokeData);
    setIsAdd(false);
    setIsEdit(true);
    setIsDelete(false);
  };

  const handleDelete = (pokeData) => {
    setSelectedPokemon(pokeData);
    setIsAdd(false);
    setIsEdit(false);
    setIsDelete(true);
  };

  const handleResponseFromDb = (response) => {
    setPokemonCompleteData(response);
  };

  const handleCloseUpdate = () => {
    setIsAdd(false);
    setIsEdit(false);
    setIsDelete(false);
    handleFetchPokemon({ handleResponse: handleResponseFromDb });
  };

  const handleFetch = (id) => {
    fetch(`users/${id}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("orhis", data);
        setOrderHistory(data);
        if (!isEmpty(data)) {
          const usrDetails = last(data);

          setUserState({
            ...userState,
            address: usrDetails.address ?? "",
            city: usrDetails.city ?? "Melbourne",
            state: usrDetails.state ?? "Vic",
            postcode: usrDetails.postal_code ?? "",
            country: usrDetails.country ?? "Australia",
            ccname:
              usrDetails.credit_card_name ??
              userState.firstName + userState.lastName,
            ccnumber: usrDetails.credit_card_number ?? "1234",
            ccexp: usrDetails.ccexp ?? "12/2024",
          });
        }
      });
  };

  useEffect(() => {
    handleFetchPokemon({ handleResponse: handleResponseFromDb });
  }, []);

  useEffect(() => {
    if (userState.id) {
      handleFetch(userState.id);
    }
  }, [userState.id]);

  console.log("Userstate", {
    user: userState,
    updateUser: (user) => setUserState({ ...user }),
    pokemon: selectedPokemon,
    cartItems: cartItems,
  });
  return (
    <div>
      <UserContext.Provider
        value={{
          user: userState,
          orderHistory: orderHistory,
          updateUser: (user) => setUserState({ ...user }),
          updateCartItem: (cartItem) => setCartItems(cartItem),
          pokemon: selectedPokemon,
          cartItems: cartItems,
        }}
      >
        <NavBar
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleSearch={handleSearchChange}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "24px",
            marginTop: "40px",
            marginLeft: "100px",
          }}
        >
          {pokemonCompleteData.length > 0 ? (
            <Box style={{ width: "100%", display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {userState.role.toLowerCase() === "admin" && (
                  <div style={{ marginLeft: "auto", marginBottom: "24px" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      endIcon={<EditIcon />}
                      onClick={() => setIsAdd(true)}
                    >
                      Add Pokemon
                    </Button>
                  </div>
                )}
                {pokemonCompleteData.filter(
                  (pokemon) =>
                    pokemon.name.toLowerCase().includes(filter.toLowerCase()) ||
                    pokemon.element_type
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                ).length > 0 ? (
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {pokemonCompleteData.map(
                      (pokemon) =>
                        (pokemon.name
                          .toLowerCase()
                          .includes(filter.toLowerCase()) ||
                          pokemon.element_type
                            .toLowerCase()
                            .includes(filter.toLowerCase())) &&
                        getPokemonCard({
                          pokemon,
                          handleAddToCart,
                          handleEdit,
                          handleDelete,
                          isAdmin: userState.role.toLowerCase() === "admin",
                        })
                    )}
                  </Grid>
                ) : (
                  <Box style={{ textAlign: "center" }}>
                    No Pokémon available
                  </Box>
                )}
              </div>
            </Box>
          ) : (
            <CircularProgress />
          )}
        </div>

        <Dialog
          fullScreen
          open={isEdit || isAdd || isDelete}
          onClose={() => handleCloseUpdate()}
        >
          <AppBar sx={{ position: "static" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => {
                  handleCloseUpdate();
                }}
                aria-label="close"
              >
                <BackIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <PokeEdit
            isAdd={isAdd}
            isEdit={isEdit}
            isDelete={isDelete}
            pokemonData={selectedPokemon}
            handleClose={handleCloseUpdate}
          />
        </Dialog>
      </UserContext.Provider>
    </div>
  );
};

export default Pokedex;

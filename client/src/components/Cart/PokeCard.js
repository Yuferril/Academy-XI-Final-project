import React from "react";
import { handleType } from "../Common/PokemonTypeIcon";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export const styles = {
  cardImg: {
    height: "200px",
    width: "200px",
    margin: "auto",
  },

  cardContent: {
    textAlign: "center",
  },
};

export const toFirstCharUppercase = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const getPokemonCard = ({
  pokemon,

  handleAddToCart,
  isAdmin = false,
  handleEdit,
  handleDelete,
}) => {
  const {
    name = "",
    sprite = "",
    description = "",
    element_type = "",
    price = "",
    weight,
    height,
  } = pokemon;

  return (
    <Grid
      item
      xs={"auto"}
      sm={"auto"}
      md={"auto"}
      key={pokemon.id}
      sx={{
        pt: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        gap: 4,
      }}
    >
      <Card
        sx={{ width: { xs: 320, md: 320 }, minWidth: 320, margin: "20px" }}
        style={{
          backgroundColor: "lightgray",
        }}
      >
        <CardMedia className="Card" image={sprite} style={styles.cardImg} />
        <CardContent style={styles.cardContent}>
          <Typography variant={'h6'}>{`${toFirstCharUppercase(name)}`}</Typography>
        <div style={{justifyContent:'center', display: 'flex'}}>{handleType(element_type)}</div>
          <Typography>{`$ ${price}`}</Typography>
          <Typography>
            {height} || {weight}
          </Typography>
          <Typography>{description}</Typography>
          {isAdmin ? (
            <>
              <IconButton onClick={() => handleEdit(pokemon)}>
                <EditIcon style={{ fill: "blue" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(pokemon)}>
                <DeleteIcon style={{ fill: "red" }} />
              </IconButton>
            </>
          ) : (
            <IconButton onClick={() => handleAddToCart(pokemon)}>
              <AddShoppingCartIcon style={{ fill: "blue" }} />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

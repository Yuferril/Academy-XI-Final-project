import React from "react"
// import Fire from "@mui/icons-material/LocalFireDepartment"
// import Water from "@mui/icons-material/WaterDrop"
// import Electric from "@mui/icons-material/ElectricBolt"
// import Grass from "@mui/icons-material/Grass"
import { Avatar, Tooltip } from "@mui/material"
import WaterIcon from "../../poketypeicon/Water.png"
import Bug from "../../poketypeicon/Bug.png"
import Dark from "../../poketypeicon/Dark.png"
import Dragon from "../../poketypeicon/Dragon.png"
import Elec from "../../poketypeicon/Electric.png"
import Fairy from "../../poketypeicon/Fairy.png"
import FireIcon from "../../poketypeicon/Fire.png"
import Fight from "../../poketypeicon/Fight.png"
import Flying from "../../poketypeicon/Flying.png"
import Ghost from "../../poketypeicon/Ghost.png"
import GrassIcon from "../../poketypeicon/Grass.png"
import Ground from "../../poketypeicon/Ground.png"
import Ice from "../../poketypeicon/Ice.png"
import Normal from "../../poketypeicon/Normal.png"
import Poison from "../../poketypeicon/Poison.png"
import Psychic from "../../poketypeicon/Psychic.png"
import Rock from "../../poketypeicon/Rock.png"
import Steel from "../../poketypeicon/Steel.png"

export const handleType = (type) => {
  let pokeType

  if (Array.isArray(type.split(" "))) {
    const arrayType = type.split(" ")
    arrayType.forEach((typePoke) => {
      switch (typePoke.toLowerCase()) {
        case "bug":
          pokeType = (
            <>
            {pokeType}
            <Tooltip title="Bug" id="bug">
               <Avatar src={Bug} />
            </Tooltip>
            </>
          )
          break
        case "dark":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Dark" >
              <Avatar src={Dark} />
              </Tooltip>
            </>
          )
          break
        case "dragon":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Dragon" >
              <Avatar src={Dragon} />
              </Tooltip>
            </>
          )
          break
        case "electric":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Electric" >
              <Avatar src={Elec} />
              </Tooltip>
            </>
          )
          break
        case "fairy":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Fairy" >
              <Avatar src={Fairy} />
              </Tooltip>
            </>
          )
          break
        case "fight":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Fighting" >
              <Avatar src={Fight} />
              </Tooltip>
            </>
          )
          break
        case "fire":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Fire" >
              <Avatar src={FireIcon} />
              </Tooltip>
            </>
          )
          break
        case "flying":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Flying" >
              <Avatar src={Flying} />
              </Tooltip>
            </>
          )
          break
        case "ghost":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Ghost" >
              <Avatar src={Ghost} />
              </Tooltip>
            </>
          )
          break
        case "grass":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Grass" >
              <Avatar src={GrassIcon} />
              </Tooltip>
            </>
          )
          break
        case "ground":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Ground" >
              <Avatar src={Ground} />
              </Tooltip>
            </>
          )
          break
        case "ice":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Ice" >
              <Avatar src={Ice} />
              </Tooltip>
            </>
          )
          break
        case "normal":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Normal" >
              <Avatar src={Normal} />
              </Tooltip>
            </>
          )
          break
        case "poison":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Poison" >
              <Avatar src={Poison} />
              </Tooltip>
            </>
          )
          break
        case "psychic":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Psychic" >
              <Avatar src={Psychic} />
              </Tooltip>
            </>
          )
          break
        case "rock":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Psychic" >
              <Avatar src={Rock} />
              </Tooltip>
            </>
          )
          break
        case "steel":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Steel" >
              <Avatar src={Steel} />
              </Tooltip>
            </>
          )
          break
        case "water":
          pokeType = (
            <>
              {pokeType} 
              <Tooltip title="Water" >
              <Avatar src={WaterIcon} />
              </Tooltip>
            </>
          )
          break
        default:
          pokeType = type
      }
    })
  } else {
    switch (type.toLowerCase()) {
      case "bug":
        return  <Avatar src={Bug} />
      case "dark":
        return <Avatar src={Dark} />
      case "dragon":
        return <Avatar src={Dragon} />
      case "electric":
        return <Avatar src={Elec} />
      case "fairy":
        return <Avatar src={Fairy} />
      case "fight":
        return <Avatar src={Fight} />
      case "fire":
        return <Avatar src={FireIcon} />
      case "flying":
        return <Avatar src={Flying} />
      case "ghost":
        return <Avatar src={Ghost} />
      case "grass":
        return <Avatar src={GrassIcon} />
      case "ground":
        return <Avatar src={Ground} />
      case "ice":
        return <Avatar src={Ice} />
      case "normal":
        return <Avatar src={Normal} />
      case "poison":
        return <Avatar src={Poison} />
      case "psychic":
        return <Avatar src={Psychic} />
      case "rock":
        return <Avatar src={Rock} />
      case "steel":
        return <Avatar src={Steel} />
      case "water":
        return <Avatar src={WaterIcon} />
      default:
        return type
    }
  }

  return pokeType
}

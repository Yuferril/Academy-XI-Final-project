import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import Cart from "../Cart/Cart";
import Checkout from "../Checkout/Checkout";
import Login from "../Login/LoginPage";
import SignUp from "../Login/SignUp";
import Avatar from "@mui/material/Avatar";
import pokeAvatar from "../../pokeballicon.png";
import { UserContext } from "../Store";
import OrderHistory from "../OrderHistory/OrderHistory";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavigationBar({
  handleAddToCart,
  handleRemoveFromCart,
  handleSearch,
  handleLogin,
  handleLogout,
}) {
  const userDetail = React.useContext(UserContext);
  const { cartItems, user } = userDetail;
  const { username, role } = user;
  const isAdmin = role.toLowerCase() === "admin";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [cartOpen, setCartOpen] = React.useState(false);

  const [checkoutOpen, setCheckoutOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [historyOpen, setHistoryOpen] = React.useState(false);

  const handleCheckout = () => {
    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const getTotalItems = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!username ? (
        <Box>
          <MenuItem
            onClick={() => {
              setIsLogin(true);
              setAnchorEl(null);
            }}
          >
            Login
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsSignup(true);
              setAnchorEl(null);
            }}
          >
            Sign up
          </MenuItem>
        </Box>
      ) : username && !isAdmin ? (
        <Box>
          <MenuItem
            onClick={() => {
              setHistoryOpen(true);
              setAnchorEl(null);
            }}
          >
            Order History
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleLogout();
              setAnchorEl(null);
            }}
          >
            Logout
          </MenuItem>
        </Box>
      ) : (
        <MenuItem
          onClick={() => {
            handleLogout();
            setAnchorEl(null);
          }}
        >
          Logout
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isAdmin && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={pokeAvatar} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by name or type"
              inputProps={{ "aria-label": "search" }}
              onChange={(r) => handleSearch(r)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h7"> Hi, {username ?? "Guest User"}</Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isAdmin && (
              <IconButton
                size="large"
                aria-label="notifications"
                color="inherit"
                onClick={() => setCartOpen(true)}
              >
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          handleCheckout={handleCheckout}
          handleLogin={() => {
            setIsLogin(true);
            setAnchorEl(null);
          }}
        />
      </Drawer>
      <Drawer
        anchor="right"
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        size={"lg"}
      >
        <Checkout />
      </Drawer>
      <Drawer
        anchor="right"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        size={"sm"}
      >
        <OrderHistory />
      </Drawer>
      {isLogin && (
        <Login
          open={isLogin}
          handleClose={() => setIsLogin(false)}
          handleLogin={handleLogin}
        />
      )}
      {isSignup && (
        <SignUp openDialog={isSignup} handleClose={() => setIsSignup(false)} />
      )}
    </Box>
  );
}

import React from "react";
import {
  useTheme,
  AppBar,
  Tooltip,
  Box,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  Badge,
  Drawer,
  Button,
  IconButton,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
const Header = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  let activeStyle = {
    color: "#333",
    backgroundColor: "#f5f5f5",
    textDecoration: "none",
    padding: "6px 16px",
    borderRadius: "4px",
  };

  let inactiveStyle = {
    color: theme.palette.text.primary,
    textDecoration: "none",
    padding: "6px 16px",
    borderRadius: "4px",
  };

  const routes = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "dashboard",
      name: "Dashboard",
    },
    {
      to: "users",
      name: "Users",
    },
    {
      to: "sellers",
      name: "Sellers",
    },
    {
      to: "products",
      name: "Products",
    },
    {
      to: "orders",
      name: "Orders",
    },
    {
      to: "categories",
      name: "Categories",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              //   aria-controls={menuId}
              aria-haspopup="true"
              //   onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant="permanent"
        style={{
          marginTop: "64px",
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            marginTop: "64px",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: "64px",
          }}
        >
          <Box
            sx={{
              flexDirection: "column",
              justifyContent: "space-between",
              display: "flex",
              height: "100%",
            }}
          >
            {routes.map((route, index) => (
              <NavLink
                key={index}
                to={route.to}
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <MenuItem>{route.name}</MenuItem>
              </NavLink>
            ))}
          </Box>
          <Box>
            <MenuItem onClick={toggleDrawer}>Logout</MenuItem>
          </Box>
        </Box>
      </Drawer>
      <Box
        sx={{
          marginLeft: "260px",
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Header;

import React from 'react'
import { useTheme, AppBar, Tooltip, Box, Toolbar, Typography, MenuItem, Menu, Badge, Drawer, Button } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom'
const Header = () => {
    const theme = useTheme()
    const [drawerOpen, setDrawerOpen] = React.useState(true)

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    let activeStyle = {
        color: "#333",
        backgroundColor: "#f5f5f5",
        textDecoration: "none",
        padding: "6px 16px",
        borderRadius: "4px",
    }

    let inactiveStyle = {
        color: theme.palette.text.primary,
        textDecoration: "none",
        padding: "6px 16px",
        borderRadius: "4px",
    }

    const routes = [
        {
            to: '/',
            name: 'Home',
        },
        {
            to: 'dashboard',
            name: 'Dashboard',
        },
        {
            to: 'users',
            name: 'Users',
        },
        {
            to: 'sellers',
            name: 'Sellers',
        },
        {
            to: 'products',
            name: 'Products',
        },
        {
            to: 'orders',
            name: 'Orders',
        },
        {
            to: 'categories',
            name: 'Categories',
        },
    ]

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button variant="outlined" onClick={toggleDrawer}>
                        Home
                    </Button>

                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                variant="temporary"
                style={{
                    marginTop: '64px',
                }}
                sx={{

                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                        marginTop: '64px',
                    },

                }}
                ModalProps={{
                    hideBackdrop: true,
                }}

            >
                <Box
                    sx={{
                        width: 250,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginTop: '64px',
                    }}
                >
                    <Box sx={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        display: 'flex',
                        height: '100%',
                    }}>
                        {routes.map((route, index) => (
                            <NavLink key={index} to={route.to} style={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                                <MenuItem >{route.name}</MenuItem>
                            </NavLink>
                        ))}
                    </Box>
                    <Box>
                        <MenuItem onClick={toggleDrawer}>Logout</MenuItem>
                    </Box>
                </Box>
            </Drawer>
            <Box sx={{
                marginLeft: "260px",
                marginTop: "64px",
            }}>

                <Outlet />
            </Box>
        </Box>
    )
}

export default Header
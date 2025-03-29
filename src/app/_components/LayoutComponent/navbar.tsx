'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '~/app/store/store';
import Image from 'next/image';

// Import the icons you need from Material UI
import { Home, Assignment, PriceCheck, Group, PersonAdd, Settings } from '@mui/icons-material';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

export default function ResponsiveAppBar(props: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const logoUrl = useSelector((state: RootState) => state.extraSlice.logoUrl);
    const drawerWidth = 240;
    const settings = ['View Profile', 'View Orders', 'Logout'];
    const [navItems, setNavItems] = useState<any[]>([]);
    const userType = useSelector((state: RootState) => state.loginSignUpSlice.userType);

    // Changing Nav Itemsn Based on User Type
    useEffect(() => {
        switch (userType) {

            case 0: // Regular user
                setNavItems([]);
                break;
            case 1: // Admin
                setNavItems([
                    { label: 'Orders', icon: <Assignment sx={{ color: 'grey' }} />, path: '/AdminPages/Orders' },
                    { label: 'Product Pricing', icon: <PriceCheck sx={{ color: 'grey' }} />, path: '/AdminPages/ProductPricing' },
                    { label: 'Salesperson', icon: <Group sx={{ color: 'grey' }} />, path: '/AdminPages/Salesperson' },
                    { label: 'User Creation', icon: <PersonAdd sx={{ color: 'grey' }} />, path: '/AdminPages/UserCreation' },
                    { label: 'Add Accessories', icon: <Settings sx={{ color: 'grey' }} />, path: '/AdminPages/AddAccessories' },
                    { label: 'Admin Profile', icon: <Home sx={{ color: 'grey' }} />, path: '/AdminPages/Profile' },
                ]);
                break;
            case 2: // Super Admin
                setNavItems([
                    { label: 'Orders', icon: <Assignment sx={{ color: 'grey' }} />, path: '/AdminPages/Orders' },
                    { label: 'Salesperson', icon: <Group sx={{ color: 'grey' }} />, path: '/AdminPages/Salesperson' },
                    { label: 'Admins', icon: <PersonAdd sx={{ color: 'grey' }} />, path: '/AdminPages/Admins' },
                    { label: 'Super Admin Profile', icon: <Home sx={{ color: 'grey' }} />, path: '/AdminPages/Profile' },
                ]);
                break;
            case 3: // Salesman
                setNavItems([
                    { label: 'Orders', icon: <Assignment sx={{ color: 'grey' }} />, path: '/AdminPages/Orders' },
                    { label: 'Profile', icon: <Home sx={{ color: 'grey' }} />, path: '/AdminPages/Profile' },
                ]);
                break;

            default:
                setNavItems([]);
                break;
        }

    }, [userType]);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavItemClick = (path: string) => {
        router.push(path); // Navigate to the route path when a nav item is clicked
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography
                variant="h6"
                sx={{
                    my: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                    cursor: 'pointer',
                }}
            >
                <Image
                    src={logoUrl}
                    priority={true}
                    alt="Logo"
                    width={140}
                    height={20}
                    onClick={() => {
                        router.push('/Dashboards/userDashboard');
                    }}
                />
            </Typography>
            <Divider />

            {/* Nav Items in Drawer */}
            <div className='flex justify-center'>
                <List sx={{ justifyItems: 'center' }} >
                    {navItems && navItems.map((item) => (
                        <ListItem key={item?.label} disablePadding>
                            <ListItemButton
                                className={`navItem ${pathname === item.path ? 'navItemActive' : ''}`}
                                sx={{
                                    textAlign: 'left', // Align text to the left (default behavior)
                                    color: 'grey',
                                    padding: 0.5,
                                    display: 'flex', // Use flex to align icon and text
                                    alignItems: 'center', // Vertically align the icon and text
                                }}
                                onClick={() => handleNavItemClick(item.path)}
                            >
                                {/* Render icon and text for each nav item */}
                                {item.icon}
                                <ListItemText
                                    primary={item.label}
                                    sx={{ fontWeight: '300', marginLeft: 1, color: pathname === item.path ? 'white' : 'grey' }} // Add marginLeft to separate the icon from text
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="static" component="nav" sx={{ backgroundColor: 'white', color: 'black' }} elevation={0}>
                <Toolbar>
                    {/* Hamburger Icon */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { xs: 'block', sm: 'block', md: 'block', lg: 'block', xl: 'none' }, // Show button on small screens only
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            mr: 3,
                            display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'block' }, // Hide text on xs screens
                            color: 'black',
                            cursor: 'pointer',
                        }}
                    >
                        <Image
                            src={logoUrl}
                            priority={true}
                            alt="Logo"
                            width={140}
                            height={20}
                            onClick={() => {
                                if (userType === 0) {
                                    router.push('/Dashboards/userDashboard');
                                }
                                else {
                                    router.push('/AdminPages/Orders');
                                }
                            }}
                        />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                className={`navButton ${pathname === item.path ? 'navButtonActive' : ''}`}
                                sx={{ color: 'grey', fontWeight: '300px' }}
                                onClick={() => handleNavItemClick(item.path)} // Navigate on click
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Avatar */}
                    <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="" />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'block' }, // Ensure drawer is visible on small screens
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

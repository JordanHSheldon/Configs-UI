'use client'

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useCookies } from 'next-client-cookies';

const SideNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const cookieStore = useCookies();
  const user = cookieStore.get('user');
  
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/players', label: 'Players' },
    user ? { href: '/profile', label: 'Profile' } : { href: '/login', label: 'Login' }
  ];

  return (
    <AppBar position="static" sx={{backgroundColor: 'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },backgroundColor: 'black', justifyContent: 'center' }} alignItems="center">
            {navItems.map((item, index) => (
              <Link href={item.href} passHref key={index}>
                <MenuItem component="p">{item.label}</MenuItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', flexGrow: 1 }} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {navItems.map((item, index) => (
                <Link href={item.href} passHref key={index}>
                  <MenuItem onClick={handleClose} component="p">{item.label}</MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SideNav;

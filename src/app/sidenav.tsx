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

const SideNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link href="/" passHref>
              <MenuItem component="p">Home</MenuItem>
            </Link>
            <Link href="/players" passHref>
              <MenuItem component="p">Players</MenuItem>
            </Link>
            <Link href="/peripherals" passHref>
              <MenuItem component="p">Peripherals</MenuItem>
            </Link>
            <Link href="/login" passHref>
              <MenuItem component="p">Login</MenuItem>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
              <Link href="/" passHref>
                <MenuItem component="p" onClick={handleClose}>Home</MenuItem>
              </Link>
              <Link href="/peripherals" passHref>
                <MenuItem component="p" onClick={handleClose}>Peripherals</MenuItem>
              </Link>
              <Link href="/players" passHref>
                <MenuItem component="p" onClick={handleClose}>Players</MenuItem>
              </Link>
              <Link href="/login" passHref>
                <MenuItem component="p" onClick={handleClose}>Login</MenuItem>
              </Link>
              <Link href="/profile" passHref>
                <MenuItem component="p" onClick={handleClose}>Profile</MenuItem>
              </Link> 
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SideNav;

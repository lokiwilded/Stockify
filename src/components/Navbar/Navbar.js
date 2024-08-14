import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SignOutButton from './SignOutButton';

const Navbar = ({ toggleDrawer, token, handleSignoutClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stockify
        </Typography>
        {token && (
          <SignOutButton handleSignoutClick={handleSignoutClick} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

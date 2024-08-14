import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DrawerMenu = ({ drawerOpen, toggleDrawer, slides, handleSlideChange }) => {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
      <List>
        {slides.map((slide, index) => (
          <ListItem button key={slide.title} onClick={() => handleSlideChange(index)}>
            <ListItemText primary={slide.title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;

import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';

const StyledArrowButton = styled(Button)({
  minWidth: 'auto',
  padding: '10px',
  margin: '0 20px',
});

const ArrowButton = ({ direction, onClick }) => {
  return (
    <StyledArrowButton onClick={onClick}>
      {direction === 'prev' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
    </StyledArrowButton>
  );
};

export default ArrowButton;

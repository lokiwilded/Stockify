import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledSignOutButton = styled(Button)({
  backgroundColor: '#f50057',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#c51162',
  },
});

const SignOutButton = ({ handleSignoutClick }) => {
  return (
    <StyledSignOutButton variant="contained" onClick={handleSignoutClick}>
      Sign Out
    </StyledSignOutButton>
  );
};

export default SignOutButton;

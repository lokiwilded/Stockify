import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledTitleBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 0',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  marginBottom: '20px',
});

const TitleBox = ({ title }) => {
  return (
    <StyledTitleBox>
      <Typography variant="h4" component="div">
        {title}
      </Typography>
    </StyledTitleBox>
  );
};

export default TitleBox;

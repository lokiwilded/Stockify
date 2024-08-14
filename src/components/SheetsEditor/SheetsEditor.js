import React, { useState, useEffect, useCallback } from 'react';
import { gapi } from 'gapi-script';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const SheetsEditor = ({ token, sheetName, range, isActive }) => {
  const rows = 3; // Number of rows in the grid
  const columns = 4; // Number of columns in the grid
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const [data, setData] = useState(Array(rows).fill(Array(columns).fill(''))); // Initialize a 3x4 grid with empty strings
  const spreadsheetId = '1jnzTq_IHDGW7lpKS_TsHgBOFk7h03rTGp3hM6JAkkPw'; // Your Google Sheets ID

  const fetchSheetData = useCallback(async () => {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!${range}`, // Fetch the specified grid range data
      });

      const fetchedData = response.result.values || [];
      const completeData = Array.from({ length: rows }, (_, rowIndex) => (
        Array.from({ length: columns }, (_, colIndex) => (
          fetchedData[rowIndex]?.[colIndex] || ''
        ))
      ));

      setData(completeData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [spreadsheetId, sheetName, range, columns, rows]);

  useEffect(() => {
    if (token && isActive) {
      fetchSheetData();
    }
  }, [token, isActive, fetchSheetData]);

  const updateSheetData = async () => {
    try {
      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!${range}`, // Update the specified grid range
        valueInputOption: 'RAW',
        resource: {
          values: data,
        },
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const updatedData = data.map((row, rIndex) =>
      row.map((col, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? value : col
      )
    );
    setData(updatedData);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {data.map((row, rowIndex) => (
          row.map((col, colIndex) => (
            <Grid item xs={3} key={`${rowIndex}-${colIndex}`}>
              <TextField
                label={`R${rowIndex + 1}C${colIndex + 1}`}
                value={col}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                fullWidth
              />
            </Grid>
          ))
        ))}
      </Grid>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={updateSheetData}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default SheetsEditor;

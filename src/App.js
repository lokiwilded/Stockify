import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from './components/Navbar/Navbar';
import SheetsEditor from './components/SheetsEditor/SheetsEditor';
import TitleBox from './components/Navbar/TitleBox';
import ArrowButton from './components/SheetsEditor/ArrowButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CLIENT_ID = '1061359028756-8145qk35v2c7l93sptf6on9hsa1bpqjv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBWmklAU9xbu7aj-6Dy-GgEvBFfCCZ0F-Y';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

const App = () => {
  const [token, setToken] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const slides = [
    { title: 'Left 1', sheetName: 'Left 1', range: 'B2:E4' },
    { title: 'Left 2', sheetName: 'Left 2', range: 'B2:E4' },
    { title: 'Middle 1', sheetName: 'Middle 1', range: 'B2:E4' },
    { title: 'Middle 2', sheetName: 'Middle 2', range: 'B2:E4' },
    { title: 'Right 1', sheetName: 'Right 1', range: 'B2:E4' },
    { title: 'Right 2', sheetName: 'Right 2', range: 'B2:E4' },
  ];

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          setToken(authInstance.currentUser.get().getAuthResponse().access_token);
        }
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      const token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
      setToken(token);
    });
  };

  const handleSignoutClick = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      setToken(null);
    });
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <ToastContainer />
      <Navbar token={token} handleSignoutClick={handleSignoutClick} />
      {!token ? (
        <Button variant="contained" color="primary" onClick={handleAuthClick}>
          Sign in with Google
        </Button>
      ) : (
        <div>
          {isMobile ? (
            <SwipeableViews
              index={activeIndex}
              onChangeIndex={(index) => setActiveIndex(index)}
              enableMouseEvents
            >
              {slides.map((slide, index) => (
                <div key={index}>
                  <TitleBox title={slide.title} />
                  <SheetsEditor token={token} sheetName={slide.sheetName} range={slide.range} isActive={activeIndex === index} />
                </div>
              ))}
            </SwipeableViews>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ArrowButton direction="prev" onClick={handlePrev} />
              <div style={{ flexGrow: 1 }}>
                {slides.map((slide, index) => (
                  activeIndex === index && (
                    <div key={index}>
                      <TitleBox title={slide.title} />
                      <SheetsEditor token={token} sheetName={slide.sheetName} range={slide.range} isActive />
                    </div>
                  )
                ))}
              </div>
              <ArrowButton direction="next" onClick={handleNext} />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default App;

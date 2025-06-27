import { createTheme, ThemeProvider } from '@mui/material/styles';
import './components/style.css';
import CardWather from './components/cardWather.js';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const theme = createTheme({
  typography: {
    fontFamily: 'Readex',
  },
  palette: {
    main: '#FFFFFF',

  }

});



function App() {
  const { i18n } = useTranslation();


  //  تقدر تستعمل هداي بلاست الهوك لي درته 
  // <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}> 
  return (
    <ThemeProvider theme={theme}>

      <div className="App" style={{ direction: i18n.language == "en" ? "ltr" : "rtl" }}>
        <CardWather />
      </div>
    </ThemeProvider>
  );
}

export default App;

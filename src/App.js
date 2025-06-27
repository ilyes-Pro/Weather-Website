import { createTheme, ThemeProvider } from '@mui/material/styles';
import './components/style.css';
import CardWather from './components/cardWather.js';
import { useState } from 'react';
const theme = createTheme({
  typography: {
    fontFamily: 'Readex',
  },
  palette: {
    main: '#FFFFFF',

  }

});



function App() {
  const [changDirection, setrchangDirection] = useState(true)
  //  تقدر تستعمل هداي بلاست الهوك لي درته 
  // <div style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}> 
  return (
    <ThemeProvider theme={theme}>

      <div className="App" style={{ direction: changDirection ? "rtl" : "ltr" }}>
        <CardWather changDirection={changDirection} setrchangDirection={setrchangDirection} />
      </div>
    </ThemeProvider>
  );
}

export default App;

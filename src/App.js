import { createTheme, ThemeProvider } from '@mui/material/styles';
import './components/style.css';
import CardWather from './components/cardWather.js';
const theme = createTheme({
  typography: {
    fontFamily: 'Readex',
  },
  palette: {
    main: '#FFFFFF',

  }

});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <CardWather />
      </div>
    </ThemeProvider>
  );
}

export default App;

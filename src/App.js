import { useEffect, useState } from 'react';
import './App.css';
import makeStyles from '@mui/styles/makeStyles'
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Toolbox from './components/Toolbox';
import OutputText from './components/OutputText';
import InputText from './components/InputText';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80
  },
}))

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#a9dfdd',
      main: '#6ccbc7',
      dark: '#00a69e',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc'
    }
  },
});


function App() {
  const classes = useStyles();
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const theme = darkTheme

  useEffect(() => {
    fetch('/api/preprocess').then(res => res.json()).then(data => {
      // setCurrentValue(data.value)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0} square={true}>
        <Grid container alignContent="center" justifyContent="stretch">
          <Container maxWidth="lg">
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <InputText inputText={inputText} setInputText={setInputText} />
            </Grid>
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <Toolbox />
            </Grid>
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <OutputText outputText={outputText} setOutputText={setOutputText} />
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </ThemeProvider >
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField'
import makeStyles from '@mui/styles/makeStyles'
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'


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
  const theme = darkTheme

  useEffect(() => {
    fetch('/api/preprocess').then(res => res.json()).then(data => {
      // setCurrentValue(data.value)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0} square={true}>
        <Grid container direction="column" alignContent="center" justifyContent="stretch">
          <Container maxWidth="lg">
            <Grid item sm={12}>
              <TextField
                id="fullWidth"
                multiline
                fullWidth
                rows={10}
                className={classes.textfield}
                label="Hello"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                inputProps={{
                  maxLength: 1000,
                }}
              />
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </ThemeProvider >
  );
}

export default App;

import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import './App.css';
import InputText from './components/InputText';
import OutputText from './components/OutputText';


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

  const [operations, setOperations] = useState({
    lowercase: false,
    lemmatize: false,
    removePunctuation: false,
    removeNumbers: false,
    removeHTML: false,
    removeNewlines: false,
  });

  const theme = darkTheme

  const handleChange = (event) => {
    setOperations({
      ...operations,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    lowercase,
    lemmatize,
    removePunctuation,
    removeNumbers,
    removeHTML,
    removeNewlines,
  } = operations

  const cleanersList = [
    { name: "removeHTML", label: "HTML tags", varName: removeHTML },
    { name: "removePunctuation", label: "Punctuation", varName: removePunctuation },
    { name: "removeNumbers", label: "Numbers", varName: removeNumbers },
    { name: "removeNewlines", label: "Newlines", varName: removeNewlines },
  ]
  const normalizersList = [
    { name: "lowercase", label: "lowercase", varName: lowercase },
    { name: "lemmatize", label: "lemmatize", varName: lemmatize },
  ]

  useEffect(() => {
    const body = {
      text: inputText,
      operations: operations
    }
    fetch(`/api/preprocess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => {
        setOutputText(data.text);
      })
      .catch(error => console.log(error))
  }, [operations])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0} square={true}>
        <Grid container alignContent="center" justifyContent="stretch">
          <Container maxWidth="lg">
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <InputText inputText={inputText} setInputText={setInputText} />
            </Grid>
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Remove</FormLabel>
                <FormGroup>
                  {cleanersList.map(({ name, label, varName }) => {
                    return (
                      <FormControlLabel
                        label={label}
                        control={
                          <Checkbox
                            value=""
                            checked={varName}
                            onChange={handleChange}
                            color="primary"
                            name={name}
                          />
                        }
                      />
                    )
                  })}
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Remove</FormLabel>
                <FormGroup>
                  {normalizersList.map(({ name, label, varName }) => {
                    return (
                      <FormControlLabel
                        label={label}
                        control={
                          <Checkbox
                            value=""
                            checked={varName}
                            onChange={handleChange}
                            color="primary"
                            name={name}
                          />
                        }
                      />
                    )
                  })}
                </FormGroup>
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={12} pb={{ sm: 4, md: 8 }}>
              <OutputText outputText={outputText} />
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </ThemeProvider >
  );
}

export default App;

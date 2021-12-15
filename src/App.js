import { Radio, RadioGroup, Typography } from '@mui/material';
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
    paddingTop: 40
  },
  formLabel: {
    // margin: 0,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#444'
    }
  },
  checkbox: {
    margin: 0,
    height: 32,
  }
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
  const [reducer, setReducer] = useState("None")

  const [operations, setOperations] = useState({
    lowercase: false,
    accented: false,
    spellcheck: false,
    removePunctuation: false,
    removeNumbers: false,
    removeHTML: false,
    removeNewlines: false,
    removeEmojis: false,
    removeUrls: false,
    removeStopwords: false,
  });

  const theme = darkTheme

  const handleChange = (event) => {
    setOperations({
      ...operations,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReducers = (event) => {
    setReducer(event.target.value)
  }

  const {
    // normalizers
    lowercase,
    accented,
    spellcheck,

    // removals
    removePunctuation,
    removeNumbers,
    removeHTML,
    removeNewlines,
    removeEmojis,
    removeUrls,
    removeStopwords,
  } = operations

  const normalizersList = [
    { name: "lowercase", label: "Lowercase", varName: lowercase },
    { name: "spellcheck", label: "Spell Correction", varName: spellcheck },
    { name: "accented", label: "Accented Characters", varName: accented },
  ]

  const removalList = [
    { name: "removeHTML", label: "HTML Tags", varName: removeHTML },
    { name: "removePunctuation", label: "Punctuation", varName: removePunctuation },
    { name: "removeNumbers", label: "Numbers", varName: removeNumbers },
    { name: "removeNewlines", label: "Newlines", varName: removeNewlines },
    { name: "removeEmojis", label: "Emojis", varName: removeEmojis },
    { name: "removeUrls", label: "Urls", varName: removeUrls },
    { name: "removeStopwords", label: "Stopwords", varName: removeStopwords },
  ]

  const reducersList = [
    { name: "None", label: "None" },
    { name: "lemmatization", label: "Lemmatization" },
    { name: "porterStemmer", label: "Porter Stemmer" },
    { name: "snowballStemmer", label: "Snowball Stemmer" },
  ]

  useEffect(() => {
    const body = {
      text: inputText,
      operations: operations,
      reducer: reducer
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
  }, [operations, reducer])

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0} square={true}>
        <Grid container alignContent="center" justifyContent="stretch">
          <Container maxWidth="md">
            <Grid item sm={12} pt={{ sm: 4, md: 8 }}>
              <InputText inputText={inputText} setInputText={setInputText} />
            </Grid>
            <Grid item sm={12} py={{ xs: 2, md: 4 }}>
              <Grid container spacing={1}>
                <Grid item sm={12} pb={3}>
                  <Typography variant="body1" color="primary">Remove</Typography>
                  <FormGroup>
                    <Grid container spacing={1}>
                      {removalList.map(({ name, label, varName }) => {
                        return (
                          <Grid item xs={12} sm={6} px={1}>
                            <FormControlLabel
                              label={label}
                              className={classes.formLabel}
                              control={
                                <Checkbox
                                  className={classes.checkbox}
                                  value=""
                                  checked={varName}
                                  onChange={handleChange}
                                  color="primary"
                                  name={name}
                                />
                              }
                            />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6} px={1}>
                  <Typography variant="body1" color="primary">Reduce Vocabulary</Typography>
                  <RadioGroup
                    onChange={handleReducers}
                    value="None"
                  >
                    <Grid container spacing={1}>
                      {reducersList.map(({ name, label }) => {
                        return (
                          <Grid item xs={12}>
                            <FormControlLabel
                              className={classes.formLabel}
                              value={name}
                              control={
                                <Radio
                                  className={classes.checkbox}
                                  checked={reducer == name}
                                  color="primary"
                                />
                              }
                              label={label}
                            />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="primary">Clean</Typography>
                  <FormGroup>
                    <Grid container spacing={1}>
                      {normalizersList.map(({ name, label, varName }) => {
                        return (
                          <Grid item xs={12} px={1}>
                            <FormControlLabel
                              label={label}
                              className={classes.formLabel}
                              control={
                                <Checkbox
                                  className={classes.checkbox}
                                  value=""
                                  checked={varName}
                                  onChange={handleChange}
                                  color="primary"
                                  name={name}
                                />
                              }
                            />
                          </Grid>
                        )
                      })}
                    </Grid>
                  </FormGroup>
                </Grid>
              </Grid>
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

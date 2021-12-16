import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect, useState } from 'react';
import './App.css';
import InputText from './components/InputText';
import OutputText from './components/OutputText';
import { ReactComponent as Logo } from './logo/logo.svg';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    // paddingTop: 12
  },
  formLabel: {
    marginLeft: 12,
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#444'
    },
    '& label': {
      margin: 20
    }
  },
  checkbox: {
    margin: 10,
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
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0 // override margin left which is -11px as default
        }
      }
    }
  }
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

  const fetchData = () => {
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
  }

  useEffect(() => {
    fetchData();
  }, [operations, reducer])

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [inputText]);

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} elevation={0} square={true}>
        <Grid container alignContent="center" justifyContent="stretch">
          <Container maxWidth="md">
            <Grid item sm={12} pt={2}>
              <Typography variant="h4" color="primary" textAlign="center">
                Text Preprocessing Toolbox
              </Typography>
            </Grid>
            <Grid item sm={12} pt={2}>
              <Typography variant="body1" textAlign="center">
                Bring your text into a form that is best suited for your task
              </Typography>
            </Grid>
            <Grid item sm={12} pt={{ xs: 1, md: 3 }}>
              <InputText inputText={inputText} setInputText={setInputText} />
            </Grid>
            <Grid item sm={12} pt={{ xs: 1, md: 2 }}>
              <OutputText outputText={outputText} />
            </Grid>
            <Grid item sm={12} pt={{ xs: 1, md: 2 }}>
              <Grid container spacing={1}>
                <Grid item sm={12} pb={{ sm: 1, md: 2 }}>
                  <Typography variant="h6" color="primary">Remove</Typography>
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
                  <Typography variant="h6" color="primary">Lemmatize / Stem</Typography>
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

                  <Typography variant="h6" color="primary">Clean</Typography>
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

            <Grid item sm={12} pt={{ xs: 2, md: 3 }}>
              <Box
                sx={{
                  borderTop: 1,
                  paddingTop: 1
                }}
              >
                <Grid container
                  alignItems="center"
                  justifyContent="space-evenly"
                // justifyContent="center"
                >
                  <Grid item xs={1}>
                    <Logo
                      height={40} width={40}
                      fill={theme.palette.primary.main}
                      stroke={theme.palette.primary.main}
                    />
                  </Grid>
                  <Grid item xs={8} zeroMinWidth>
                    Designed and created by <Link
                      href="https://krisograbek.github.io/"
                      // className={classes.link}
                      underline="hover"
                      target="_blank"
                      rel="noreferrer"
                    >Kris Ograbek
                    </Link> &copy; {new Date().getFullYear()} (
                    <Link
                      href="https://github.com/krisograbek/text-preprocessing-app"
                      // className={classes.link}
                      underline="hover"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source Code
                    </Link>
                    )
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Container>
        </Grid>
      </Paper >
    </ThemeProvider >
  );
}

export default App;

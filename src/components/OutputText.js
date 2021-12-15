import React from 'react'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-disabled': {
      color: 'white',
    },
    '& textarea.Mui-disabled': {
      // color: 'white',
      textFillColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      // '& fieldset': {
    }
    // }
  },
}))


const CssTextField = styled(TextField)({
  '& label.Mui-disabled': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

function InputText(props) {
  const classes = useStyles()
  const { outputText, setOutputText } = props
  return (
    <TextField
      id="fullWidth"
      className={classes.textField}
      multiline
      fullWidth
      disabled
      rows={5}
      label="Output"
      value={outputText}
      // onChange={e => setOutputText(e.target.value)}
      inputProps={{
        maxLength: 1000,
      }}
      sx={{ color: "green" }}
    />
  )
}

export default InputText
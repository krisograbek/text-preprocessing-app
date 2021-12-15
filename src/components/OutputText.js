import React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-disabled': {
      color: 'white',
    },
    '& textarea.Mui-disabled': {
      // color: 'white',
      textFillColor: 'white',
      '&:hover': {
        cursor: "pointer"
      },
      // '& tooltip:hover': {
      //   cursor: "pointer"
      // },
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '& fieldset': {
        // cursor: ,
      }
    }
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

// Man, I had to move this outside of the function to be 
// able to reset timer
let timer;

function OutputText(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const { outputText, setOutputText } = props;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    if (timer) {
      clearTimeout(timer);
    }
    setAnchorEl(event.currentTarget);
    navigator.clipboard.writeText(outputText);
    timer = setTimeout(() => setAnchorEl(null), 3000)
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Tooltip title="Copy to Clipboard">
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
          onClick={(event) => handleClick(event)}
          inputProps={{
            maxLength: 1000,
          }}
          sx={{ color: "green" }}
        />
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>Text Copied!</Typography>
      </Popover>
    </div>
  )
}
export default OutputText

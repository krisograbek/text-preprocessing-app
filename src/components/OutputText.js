import Popover from '@mui/material/Popover';
import styled from '@mui/material/styles/styled';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  textField: {
    '& label.Mui-disabled': {
      color: 'white',
    },
    '& textarea.Mui-disabled': {
      textFillColor: 'white',
      '&:hover': {
        cursor: "pointer"
      },
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
    }
  }
}))

const MyTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(({ theme }) => `
    color: ${theme.palette.primary.main};
    background-color: #333;
    font-size: 1em;
`);

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
      <MyTooltip title="Click the Textarea to copy" followCursor>
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
          sx={{ ml: -2 }}
        />
      </MyTooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 1 }} color="primary">Text Copied!</Typography>
      </Popover>
    </div>
  )
}
export default OutputText

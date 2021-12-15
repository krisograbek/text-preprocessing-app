import React from 'react'
import TextField from '@mui/material/TextField'

function InputText(props) {
  const { outputText, setOutputText } = props
  return (
    <TextField
      id="fullWidth"
      // color="secondary"
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
    />
  )
}

export default InputText
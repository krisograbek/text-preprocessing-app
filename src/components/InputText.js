import React from 'react'
import TextField from '@mui/material/TextField'

function InputText(props) {
  const { inputText, setInputText } = props
  return (
    <TextField
      id="fullWidth"
      multiline
      fullWidth
      rows={10}
      label="Paste Your Text Here"
      value={inputText}
      onChange={e => setInputText(e.target.value)}
      inputProps={{
        maxLength: 1000,
      }}
    />
  )
}

export default InputText
// MessageInput.js
import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const MessageInput = ({ onSendPrompt }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSendPrompt(inputText); // Send the prompt to the backend
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder="Which lyric would you like to generate?..."
        fullWidth
        value={inputText}
        onChange={handleChange}
      />      
      <Button variant="contained" color="primary" style={{ marginTop:10 + 'px' }} type="submit">
        Generate
      </Button>
    </form>
  );
}

export default MessageInput;

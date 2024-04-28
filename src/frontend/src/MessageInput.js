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
        placeholder="Type a prompt..."
        fullWidth
        value={inputText}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Send Prompt
      </Button>
    </form>
  );
}

export default MessageInput;

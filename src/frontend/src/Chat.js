// Chat.js
import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import MessageInput from './MessageInput';
import ResponseDisplay from './ResponseDisplay';
import axios from 'axios'; // Import axios

const Chat = () => {
  const [response, setResponse] = useState(null);

  const sendPrompt = (prompt) => {
    console.log("sending ... ");
    axios.post('http://localhost:3000/api/v1/garmony/', { prompt })
      .then(response => {
        console.log('Response:', response.data);
        setResponse(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error if needed
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Garmony Muse - Lyrics generator
      </Typography>
      <MessageInput onSendPrompt={sendPrompt} />
      {response && <ResponseDisplay {...response} />}
    </Container>
  );
}

export default Chat;

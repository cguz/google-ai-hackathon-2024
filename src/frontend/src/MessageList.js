// MessageList.js
import React from 'react';
import { Paper, Typography } from '@material-ui/core';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <Paper key={index} elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
          <Typography variant="body1">
            {message.text}
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

export default MessageList;

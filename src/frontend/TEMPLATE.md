# Template Chat Website

## Step 1: Setting up the Project

```bash
$ npx create-react-app chat-app
$ cd chat-app
```

## Step 2: Installing Dependencies

```bash
$ npm install axios @material-ui/core @material-ui/icons
```

## Step 3: Creating the Chat Interface

Inside the src folder, create a new file named Chat.js:

```JS
// Chat.js
import React from 'react';
import { Container, Typography } from '@material-ui/core';

const Chat = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chat App
      </Typography>
      {/* Add chat interface components here */}
    </Container>
  );
}

export default Chat;
```

## Step 4: Adding Chat Components

Inside the src folder, create two new files: MessageList.js and MessageInput.js.

```JS
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
```

```JS
// MessageInput.js
import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const MessageInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder="Type a message..."
        fullWidth
        value={inputText}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </form>
  );
}

export default MessageInput;
```

## Step 5: Integrating Components into Chat.js

```JS
// Chat.js
import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    const newMessage = { text, sender: 'user' }; // Assuming the sender is always the user
    setMessages([...messages, newMessage]);
    // Here you can also make a request to a backend server to send the message
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chat App
      </Typography>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </Container>
  );
}

export default Chat;
```

## Step 6: Rendering the Chat Component

```JS
// App.js
import React from 'react';
import Chat from './Chat';

function App() {
  return (
    <div>
      <Chat />
    </div>
  );
}

export default App;
```

## Step 7: Running the App

Inside the chat-app:

```bash
$ npm start
```
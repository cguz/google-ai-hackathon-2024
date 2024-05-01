// Chat.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import MessageInput from './MessageInput';
import ResponseDisplay from './ResponseDisplay';
import axios from 'axios'; // Import axios

const Chat = () => {
  const [lyrics, setLyrics] = useState([]); // State to store lyric titles
  const [response, setResponse] = useState(null);

  // Fetch lyric titles on component mount  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/garmony/titles/');
      setLyrics(response.data);
    } catch (error) {
      console.error('Error fetching lyrics:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchLyricInfo = async (lyricId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/garmony/${lyricId}`);
      setResponse(response.data);
    } catch (error) {
      console.error('Error fetching lyric info:', error);
    }
  };

  const sendPrompt = async (prompt) => {
    console.log("sending ... ");
    try {
      const response = await axios.post('http://localhost:3000/api/v1/garmony/', { prompt });
      console.log('Response:', response.data);
      setResponse(response.data);
  
      await fetchData(); // Call the function to fetch updated titles
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  return (
    <div className="lyric-container">
      {/* Left section for lyric titles */}
      <div className="lyric-titles">
        <Container>
          <Typography variant="h5" gutterBottom style={{ marginTop: 20 + 'px', marginBottom: 10 + 'px' }}>
            Lyrics
          </Typography>
          <List>
            {lyrics.map(lyric => (
              <ListItem key={lyric.id} button onClick={() => fetchLyricInfo(lyric.id)}>
                <ListItemText primary={lyric.title} />
              </ListItem>
            ))}
          </List>
        </Container>
      </div>

      {/* Right section for main content */}
      <div className="main-content">
        <div className="top-container">
          <Container>
            <Typography variant="h2" gutterBottom style={{ marginTop:60+'px', marginBottom:0+'px', textAlign: 'center'}}>
              Garmony Muse 
            </Typography>
            <Typography variant="h4" gutterBottom style={{ marginTop:0+'px', marginBottom: 50+'px', textAlign: 'center'}}>
              (Lyrics generator)
            </Typography>
            {response && <ResponseDisplay {...response} />}
          </Container>
        </div>
        <div className="bottom-container">
          <Container>
            <MessageInput onSendPrompt={sendPrompt} />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Chat;

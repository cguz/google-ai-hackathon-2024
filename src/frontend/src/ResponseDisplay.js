// ResponseDisplay.js
import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';

const ResponseDisplay = ({ title, lyric, cover, speech }) => {
  return (
    <div className="response-container"> 
      <Typography variant="h4">{title}</Typography>
      <br />
      <Card style={{ display: 'flex', boxShadow: 'none'}}> {/* Set flexbox display */}
        <CardContent style={{ flex: 1 }}> {/* Allow CardContent to grow */}
          <Typography variant="body1" style={{ fontFamily: 'Segoe UI', fontSize:1.25+'rem'}}>
            {lyric && lyric.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          alt="Cover"
          height="auto"
          image={cover}
          style={{ width: 500 }}
        />
      </Card>
      <br />
      <audio controls>
        <source src={speech} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default ResponseDisplay;

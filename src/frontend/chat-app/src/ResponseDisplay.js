// ResponseDisplay.js
import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';

const ResponseDisplay = ({ title, lyric, cover, speech }) => {
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Card style={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          alt="Cover"
          height="auto"
          image={cover}
        />
        <CardContent>
          <Typography variant="body1">{lyric}</Typography>
        </CardContent>
      </Card>
      <audio controls>
        <source src={speech} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default ResponseDisplay;

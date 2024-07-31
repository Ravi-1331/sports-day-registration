import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SelectedEventCard = ({ event, deselectEvent }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{event.name}</Typography>
        <Typography color="textSecondary">{event.category}</Typography>
        <Typography color="textSecondary">{event.timing}</Typography>
        <Button variant="contained" color="secondary" onClick={() => deselectEvent(event.id)}>
          Deselect
        </Button>
      </CardContent>
    </Card>
  );
};

export default SelectedEventCard;

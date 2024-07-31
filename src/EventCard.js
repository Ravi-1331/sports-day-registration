import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const EventCard = ({ event, selectEvent, selectedEvents }) => {
  const isEventSelected = selectedEvents.some(selectedEvent => selectedEvent.id === event.id);

  const handleSelectEvent = () => {
    if (!isEventSelected) {
      selectEvent(event);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{event.name}</Typography>
        <Typography color="textSecondary">{event.category}</Typography>
        <Typography color="textSecondary">{event.timing}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSelectEvent} 
          disabled={isEventSelected || selectedEvents.length >= 3}
        >
          {isEventSelected ? 'Selected' : 'Select'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;

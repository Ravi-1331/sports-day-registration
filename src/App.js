import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import EventCard from './EventCard';
import SelectedEventCard from './SelectedEventCard';

// Replace with your Mock API URL
const mockApiUrl = 'https://run.mocky.io/v3/61347b95-ded6-4a80-8496-eca5db2d7b56';

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the mock API
    const fetchEvents = async () => {
      try {
        const response = await axios.get(mockApiUrl);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Load selected events from local storage
    const storedSelectedEvents = JSON.parse(localStorage.getItem('selectedEvents')) || [];
    setSelectedEvents(storedSelectedEvents);
  }, []);

  useEffect(() => {
    // Save selected events to local storage
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const isTimingConflict = (newEvent) => {
    const newEventTime = newEvent.timing.split(' - ');
    const newEventStart = new Date(`1970/01/01 ${newEventTime[0]}`);
    const newEventEnd = new Date(`1970/01/01 ${newEventTime[1]}`);

    return selectedEvents.some(event => {
      const eventTime = event.timing.split(' - ');
      const eventStart = new Date(`1970/01/01 ${eventTime[0]}`);
      const eventEnd = new Date(`1970/01/01 ${eventTime[1]}`);

      return newEventStart < eventEnd && newEventEnd > eventStart;
    });
  };

  const selectEvent = (event) => {
    if (selectedEvents.length < 3 && !isTimingConflict(event)) {
      setSelectedEvents([...selectedEvents, event]);
    } else if (isTimingConflict(event)) {
      alert('This event conflicts with the timing of an already selected event.');
    }
  };

  const deselectEvent = (eventId) => {
    setSelectedEvents(selectedEvents.filter(event => event.id !== eventId));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Sports Day Registration</Typography>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h6">Available Events</Typography>
          <Grid container spacing={0}>
            {events.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                selectEvent={selectEvent} 
                selectedEvents={selectedEvents} 
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">Selected Events</Typography>
          <Grid container spacing={0}>
            {selectedEvents.map(event => (
              <SelectedEventCard 
                key={event.id} 
                event={event} 
                deselectEvent={deselectEvent} 
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;

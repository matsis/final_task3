import React, { useState, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// set first day of the week to Monday
moment.locale('en',{
  week:{
    dow : 1
  }
});

const localizer = momentLocalizer(moment);

const TrainingCalendar = () => {

  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetchAllTrainings();
  }, []);

  const fetchAllTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(err => console.error(err))
  }

  const formattedEvents = events.map(event => ({
    //console.log(events);
    start: new Date(event.date),
    end: moment(new Date(event.date)).add(event.duration,'minutes').toDate(),
    title: event.activity + " / " + event.customer.firstname + " " + event.customer.lastname

}));

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        defaultDate={new Date()}
        style={{ height: 600 }} 
        //set time range for calendar view 7 am - 20 pm
        min={new Date(0, 0, 0, 7, 0, 0)}
        max={new Date(0, 0, 0, 20, 0, 0)}   
      />
    </div>
  )
};

export default TrainingCalendar;
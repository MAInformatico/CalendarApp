import './App.css';
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  //"en-US": require("date-fns/locale/en-US")
  "es": require("date-fns/locale/es")
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    title: "Troubleshoot meeting",
    allDay: true,
    start: new Date(2022,10,30),
    end: new Date(2022,10,30)    
  },
  {
    title: "Training",
    allDay: false,
    start: new Date(2022,10,7),
    end: new Date(2022,10,10)    
  },
    {
    title: "Vacation",
    allDay: true,
    start: new Date(2022,10,20),
    end: new Date(2022,10,23)    
  }
]




function App() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

function addEvent(){
  setAllEvents([...allEvents, newEvent])
}

  return (
    <div className="App">
    <h2>Calendar App</h2>
    <h3>Add New Event</h3>
    <div>
      <input type="text" placeholder="Add title" style={{width: "20%", marginRight: "10px"}}
      value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value}) }
      />
      <DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
      selected={newEvent.start} onChange= {(start) => setNewEvent({...newEvent, start})}/>
      <DatePicker placeholderText="End Date" style={{marginRight: "10px"}}
      selected={newEvent.end} onChange= {(end) => setNewEvent({...newEvent, end})}
      />
      <button style={{marginTop: "10px"}} onClick={addEvent}>Add event</button>
    </div>
    <Calendar
      localizer={localizer} 
      events={allEvents}
      startAccessor= "start"
      endAccessor= "end"
      style={{height: 500, margin: "50px"}} />      
    </div>
  );
}

export default App;

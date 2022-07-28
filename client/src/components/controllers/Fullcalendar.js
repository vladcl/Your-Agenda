import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import Axios from 'axios';

export default function Calendar() {

    const [listActivities, setListActivities] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/getCalendar').then((response) => {
          setListActivities(response.data);
        });
      }, []);
    

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={listActivities}  
            
        />
    )

}
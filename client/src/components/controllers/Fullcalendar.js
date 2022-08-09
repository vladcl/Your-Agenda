/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Calendar() {
  const navigate = useNavigate();
  const [listActivities, setListActivities] = useState();

  useEffect(() => {
    Axios.get('http://localhost:3001/getCalendar', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    }).then((response) => {
      setListActivities(response.data);
    }).catch((err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    });;
  }, []);


  return (

    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={listActivities}
      customButtons={{
        myCustomButton: {
          text: 'Voltar',
          click: function () {
            navigate('/agenda');
          },
        },
      }}
      headerToolbar={{
        start: 'title',
        center: 'today myCustomButton',
        end: 'prev,next',
      }}
    />
  )

}
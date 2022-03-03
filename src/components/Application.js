import React, {useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";

export default function Application(props) {

  const setDay = day => {
    setState({ ...state, day })
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  let appointments = getAppointmentsForDay(state, state.day);
  const appointmentItems = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        />
    )
  });

  useEffect(()=>{
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
    ]).then((all) =>{
      console.log(all[1].data)
      setState(prev=>({...prev, days : all[0].data, appointments : all[1].data}));
    })
  },[]);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       {appointmentItems}
      </section>
    </main>
  );
}

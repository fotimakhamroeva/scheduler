import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {

  const setDay = day => {
    setState({ ...state, day })
  };

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      }
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      }
    }

    let days = state.days
    days[dayOfWeek] = day;


    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment).then(() => {
      setState({ ...state, appointments, days });
    })
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const dayOfWeek = findDay(state.day)

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    const url = `/api/appointments/${id}`;

    return axios.delete(url, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  let appointments = getAppointmentsForDay(state, state.day);
  const appointmentItems = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={state.interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  });

  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersurl = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersurl)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

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

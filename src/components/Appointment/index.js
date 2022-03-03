import React from 'react';
import './styles.scss';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
    const show = (props.interview) ? true : false;
    return (
        <article className="appointment" data-testid="appointment">
            <Header time={props.time} />
            { show ? <Show interview={props.interview} /> : <Empty /> }
        </article>
    )
}
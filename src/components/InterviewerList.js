import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
    console.log(props);
    const interviewersListData = Object.values(props.interviewers).map(interviewer => {
        return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={props.interviewer === interviewer.id}
            setInterviewer={event => { props.onChange(interviewer.id) }}
        />
    });
    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewersListData}</ul>
        </section>
    )
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};
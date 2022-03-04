import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [name, setName] = useState(props.name || "");
    const [nameError, setNameError] = useState("");
    const [interviewerError, setInterviewerError] = useState("");

    const reset = function () {
        setName("");
        setInterviewer(null);
    }
    const cancel = function () {
        reset();
        props.onCancel();
    }

    //to validate that the name input cannot be empty
    function validate() {
        if (!name || name === "") {
            setNameError("Student name cannot be blank");
            return;
        }
        setNameError("");
        if (!interviewer) {
            setInterviewerError("An interviewer must be selected");
            return;
        }
        setInterviewerError("");
        props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name={props.name}
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        data-testid="student-name-input" />
                    <section className="appointment__validation">{nameError}</section>
                </form>
                <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
                <section className="appointment__validation">{interviewerError}</section>
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={event => validate()} >Save</Button>
                </section>
            </section>
        </main>
    );
}
import React from 'react';
import DayListItem from './DayListItem';

export default function dayList(props){
    const dayListItems = props.days.map( day => (
        <DayListItem 
            key={day.id} 
            name={day.name} 
            spots={day.spots} 
            selected={props.name === props.value}
            setDay={props.onChange}/>
    ))
    return(
        <ul>
            { dayListItems }
        </ul>
    )
};
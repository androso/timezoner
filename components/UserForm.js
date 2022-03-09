import React from 'react'
import { StyledUserForm } from '../styles'
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClose} from '@fortawesome/free-solid-svg-icons';



export default function UserForm() {
    
    return (
        <>
            <div className='tagline'>
                Add a Friend    
            </div>
            <div className='user-container'>
                {/* //TODO: Show close button only if user container > 1  */}
                <button className="close-user">
                    <FontAwesomeIcon icon={faClose} />
                </button> 
                <input type="text" placeholder='Username' />
                {/* //TODO: i want this timezone's value to change when clicked to `GMT${userinput}`*/}
                <input type="text" placeholder='Timezone (GMT)' />
                {/* //TODO: place here each new schedule, using a map over some state (collection of schedules) */}
                <button className='cta add-schedule' title="Add new schedule">
                    <FontAwesomeIcon icon={faPlus} className="add-icon"/>
                    {" "}Add Schedule
                </button>
            </div>
        </>   
    )
}

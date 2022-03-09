import React from 'react'
import { StyledUserForm } from '../styles'
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function UsersForm() {
  return (
    <>
    <StyledUserForm>
        <div className='upper-text-container'>
            <h1 className="title">Convert between timezones</h1>
        </div> 
        <FormContainer>
            <UserForm />
            <div className='form-footer-actions'>
                <button className='cta' title="Start conversion">
                    START
                </button>
                <button className='cta add-user' title="Add new friend">
                    <FontAwesomeIcon icon={faPlus} className="add-icon"/>
                </button>
            </div>
        </FormContainer>    
    </StyledUserForm>
    </>
  )
}

function UserForm() {
    return (
        <>
            <div className='tagline'>
                Add a Friend    
            </div>
            <div className='user-container'>
                {/* //TODO: Show close button only if user container > 1  */}
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
const FormContainer = styled.div`
    min-width: 320px;
    min-height: 328px;
    background-color: #454545;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items:center;

    .tagline {
        
    }
    .user-container {
        display: flex;
        flex-direction: column;
        align-items: center; 
        background-color: #6B705C;
        max-width: 278px;
    }
    .add-user {
        font-size: 1rem;
    }
`;
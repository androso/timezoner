import styled from "styled-components";

const StyledDatePickers = styled.div`
    display: flex;
    margin-bottom: 9px;
    input {
        max-width: 90px;
        text-align: center;
        margin-bottom: 0 !important;
    }
    .text-separator {
        color: var(--white);
        font-size: 1rem;
        font-weight: 500;
        align-self: center;
        
    }
    input, .text-separator {
        margin-right: 10px;
    }
    .end-timegit-picker {
        margin-right: 5px;
    }
    .react-datepicker-wrapper {
        width: initial;
    }
    .close-button {
		cursor: pointer;
        height: 1.5rem;
        align-self: center;
		font-size: 1.4rem;
		background-color: transparent !important;
		border: none;
		color: var(--black-pale);
        transition: color .3s ease; 
    }
    .close-button:hover {
        color: var(--black);
    }
    .danger-icon {
		color: var(--orange-pale);
		margin-right: 5px;
        align-self: center;
    }
`;

export default StyledDatePickers;

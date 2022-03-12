import styled from "styled-components";

const StyledDatePickers = styled.div`
    display: flex;
    input {
        max-width: 90px;
        text-align: center;
    }
    .text-separator {
        color: var(--white);
        font-size: 1rem;
        font-weight: 500;
        align-self: flex-end;
        padding-bottom: 1.1rem; //faking the centered state
    }

    input, .text-separator {
        margin-right: 10px;
    }
`;

export default StyledDatePickers;

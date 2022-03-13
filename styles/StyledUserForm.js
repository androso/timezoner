
import styled from "styled-components";
const StyledUserForm = styled.form`
    text-align: center;
    .title {
        margin-bottom: 50px;
    }
    .form-container {
		min-width: 320px;
		background-color: var(--black-pale);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding: 31px 21px;
	}
	
	.tagline,
	.user-container,
	.user-container input,
	.cta {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.close-user svg {
		filter: drop-shadow(0px 4px 4px rgba(0 0 0 / 0.45));
	}

	.tagline {
		background-color: var(--green-strong);
		position: absolute;
		top: -15px;
		padding: 5px 15px;
		border-radius: 6px;
		color: #fafafa;
		font-weight: 500;
	}
	.user-container {
		display: flex;
		flex-direction: column;
		background-color: var(--green-strong);
		min-width: 90%;
		min-height: 178px;
		border-radius: 10px;
		padding: 39px 27px;
		margin-bottom: 20px;
		position: relative;
	}
	.user-container input {
		width: 100%;
		background-color: var(--black-pale);
		border-radius: 6px;
		border: none;
		padding: 10px 12px;
		margin-bottom: 9px;
		color: var(--white);
		font-size: 1rem;
	}
	.user-container input::placeholder {
		color: #cecece;
	}
	.user-container input:focus {
		outline: none;
	}
	.cta {
		background-color: var(--black-dark);
		color: var(--white);
		border: none;
		border-radius: var(--border-radius-subtle);
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-size: .9rem;
	}
	.cta:hover {
		background-color: #000;
	}
	.form-footer-actions {
		display: flex;
		/* min-width: 278px; */
		min-width: 90%;
		justify-content: center;
		position: relative;
		box-shadow: none;
	}
	.cta.start {
		padding: 10px 25px;
		margin-right: 10px;
		font-weight: 700;
	}
	.cta.add-user {
		font-size: 1.5rem;
		padding: 3px 8px;
		position: absolute;
		right: 0;
	}
	.cta.add-schedule {
		padding: 5px 15px;
		align-self: flex-start;
		font-weight: 500;
	}
	.close-user {
		position: absolute;
		cursor: pointer;
		right: 10px;
		top: 5px;
		font-size: 1.4rem;
		background-color: transparent !important;
		border: none;
		color: var(--black-pale);
	}
`;

export default StyledUserForm;
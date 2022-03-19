import styled from "styled-components";
const StyledUserCard = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--green-strong);
	min-width: 90%;
	min-height: 178px;
	border-radius: 10px;
	padding: 39px 27px;
	margin-bottom: 20px;
	position: relative;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

	input {
		width: 100%;
		background-color: var(--black-pale);
		border-radius: 6px;
		border: none;
		padding: 10px 12px;
		color: var(--white);
		font-size: 1rem;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.input-container {
		margin-bottom: 9px;
		text-align: left;
	}
	input::placeholder {
		color: #cecece;
	}
	input:focus {
		outline: none;
	}
	.input-container .error-message {
		color: var(--yellow);
		font-weight: 500;
		margin-top: 5px;
		font-size: 0.9rem;
	}
	.input-container .danger-icon {
		color: var(--orange-pale);
		margin-right: 5px;
		max-height: 0.9rem;
	}
	.danger-icon.single {
		padding: 2px 2px 3px 2px;
		border-radius: 4px;
		transition: 0.3s all ease;
	}
	.danger-icon.single:hover {
		background-color: #555;
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
		padding: 0 4px;
		border-radius: 5px;
		transition: background-color 0.5s ease, color 0.5s ease;
	}
	.close-user:hover {
		background-color: var(--black-pale) !important;
        color: var(--white);
	}
	.close-user svg {
		filter: drop-shadow(0px 4px 4px rgba(0 0 0 / 0.45));
	}
`;


export default StyledUserCard;

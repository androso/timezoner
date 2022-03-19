import styled from "styled-components";
const StyledUserForm = styled.form`
	text-align: center;
	.title {
		/* font-size: 2.5rem; */
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
	.cta {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

	.cta {
		background-color: var(--black-dark);
		color: var(--white);
		border: none;
		border-radius: var(--border-radius-subtle);
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-size: 0.9rem;
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
	
	
`;

export default StyledUserForm;

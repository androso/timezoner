import React from "react";
import { StyledUserForm } from "../styles";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserForm } from "../components";

export default function UsersForm() {
	return (
		<>
			<StyledUserForm>
				<div className="upper-text-container">
					<h1 className="title">Convert between timezones</h1>
				</div>
				<FormContainer>
					<UserForm />
					<div className="form-footer-actions">
						<button className="cta" title="Start conversion">
							START
						</button>
						<button className="cta add-user" title="Add new friend">
							<FontAwesomeIcon icon={faPlus} className="add-icon" />
						</button>
					</div>
				</FormContainer>
			</StyledUserForm>
		</>
	);
}

const FormContainer = styled.div`
	min-width: 320px;
	min-height: 328px;
	background-color: var(--black-pale);
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	position: relative;
	padding: 31px 21px;

	.tagline {
        background-color: var(--green-strong);
		position: absolute;
		top: -15px;
		padding: 5px 15px;
		border-radius: 6px; 
		color: #fafafa;
	}
	.user-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--green-strong);
		width: 278px;
		min-height: 178px;
		border-radius: 10px;
		padding: 39px 27px;
	}
	.user-container input {
		width: 100%;
		background-color: var(--black-pale);
		border-radius: 6px;
		border: none;
		padding: 10px 12px;
		margin-bottom: 9px;
		color: var(--white);
	}
	.user-container input::placeholder {
		color: #cecece;
	}
	.user-container input:focus {
		outline: none;
	}
	.add-user {
		font-size: 1rem;
	}
	
`;

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
	background-color: #454545;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.tagline {
	}
	.user-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #6b705c;
		max-width: 278px;
	}
	.add-user {
		font-size: 1rem;
	}
`;

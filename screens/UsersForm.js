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
					<h1 className="title">Schedule between timezones</h1>
				</div>
				<div className="form-container">
					<UserForm />
					<div className="form-footer-actions">
						<button className="cta start" title="Start conversion">
							START
						</button>
						<button className="cta add-user" title="Add new friend">
							<FontAwesomeIcon icon={faPlus} className="add-icon" />
						</button>
					</div>
				</div>
			</StyledUserForm>
		</>
	);
}

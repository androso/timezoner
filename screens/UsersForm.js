import React, { useState, useEffect } from "react";
import { StyledUserForm } from "../styles";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";


//TODO: delete Userform in components

export default function UsersForm({ registerField, handleSubmit, formErrors }) {
	useEffect(() => {}, []);

	return (
		<>
			<StyledUserForm>
				<div className="upper-text-container">
					<h1 className="title">Schedule between timezones</h1>
				</div>
				<div className="form-container">
					<User />

					<div className="form-footer-actions">
						<button className="cta start" title="Start conversion">
							START
						</button>
						<button
							className="cta add-user"
							title="Add new friend"
							onClick={() => {
								addUser();
							}}
						>
							<FontAwesomeIcon icon={faPlus} className="add-icon" />
						</button>
					</div>
				</div>
			</StyledUserForm>
		</>
	);
}

function User() {
	return (
		<>
			<div className="tagline">Add a Friend</div>
			<div className="user-container">
				{/* //TODO: Show close button only if user container > 1  */}
				<button
					className="close-user"
					onClick={() => {
						handleDelete(index);
					}}
				>
					<FontAwesomeIcon icon={faClose} />
				</button>
				<input type="text" placeholder="Username" />
				{/* //TODO: i want this timezone's value to change when clicked to `GMT${userinput}`*/}
				<input type="text" placeholder="Timezone (GMT)" />
				{/* //TODO: place here each new schedule, using a map over some state (collection of schedules) */}
				<button className="cta add-schedule" title="Add new schedule">
					<FontAwesomeIcon icon={faPlus} className="add-icon" /> Add Schedule
				</button>
			</div>
		</>
	);
}

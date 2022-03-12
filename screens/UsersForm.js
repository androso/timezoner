import React, { useState, useEffect } from "react";
import { StyledUserForm } from "../styles";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose } from "@fortawesome/free-solid-svg-icons";
import { emptyUser } from "../utils/userSchema";
import { useFieldArray } from "react-hook-form";
//TODO: delete Userform in components

export default function UsersForm({
	registerField,
	addUser,
	deleteUser,
	users,
	fieldArrayName,
	control
}) {
	const handleAddUser = () => {
		//TODO: if the user has not given any input for the prev user, return false;
		addUser(emptyUser);
	};

	return (
		<>
			<StyledUserForm>
				<div className="upper-text-container">
					<h1 className="title">Schedule between timezones</h1>
				</div>
				<div className="form-container">
					{users.map((item, index) => {
						return (
							<User
								key={item.id}
								registerField={registerField}
								deleteUser={deleteUser}
								fieldArrayName={fieldArrayName}
								userMapIndex={index}
								users={users}
								currentUser={item}
								control={control}
							/>
						);
					})}

					<div className="form-footer-actions">
						<button className="cta start" title="Start conversion">
							START
						</button>
						<button
							className="cta add-user"
							title="Add new friend"
							onClick={handleAddUser}
						>
							<FontAwesomeIcon icon={faPlus} className="add-icon" />
						</button>
					</div>
				</div>
			</StyledUserForm>
		</>
	);
}

function User({ registerField, deleteUser, users, fieldArrayName, userMapIndex, currentUser, control }) {
	//Schedules could be under this component state scope
	const [wantsToAddSchedules, setWantsToAddSchedules] = useState(false);

	const handleDeleteUser = (userIndex) => {
		deleteUser(userIndex);
	};
	

	return (
		<>
			<div className="tagline">Add a Friend</div>
			<div className="user-container">
				{users.length > 1 && (
					<button
						className="close-user"
						onClick={() => {
							handleDeleteUser(userMapIndex);
						}}
					>
						<FontAwesomeIcon icon={faClose} />
					</button>
				)}
				<input
					type="text"
					placeholder="Username"
					{...registerField(`${fieldArrayName}.${userMapIndex}.username`, {
						required: "You must fill this field",
					})}
				/>
				{/* //TODO: i want this timezone's value to change when clicked to `GMT${userinput}`*/}
				<input
					type="text"
					placeholder="Timezone (GMT)"
					{...registerField(`${fieldArrayName}.${userMapIndex}.gmt`, {
						required: "You must fill this field",
					})}
				/>
				<NestedUserSchedulesArray
					nestIndex={userMapIndex}
					{...{control, registerField}}
				/>
			</div>
		</>
	);
}
function NestedUserSchedulesArray({nestIndex, registerField, control}) {
	const { fields, append} = useFieldArray({
		control, 
		name: `usersForm[${nestIndex}].preferedSchedule`
	})

	const [wantsToAddSchedules, setWantsToAddSchedules] = useState(false);

	const handleAddSchedule = () => {
		setWantsToAddSchedules(true);
	};

	return (

		<button
			onClick={handleAddSchedule}
			className="cta add-schedule"
			title="Add new schedule"
		>
			<FontAwesomeIcon icon={faPlus} className="add-icon" /> Add Schedule
		</button>
	)
}
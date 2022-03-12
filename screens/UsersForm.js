import React, { useState, useEffect } from "react";
import { StyledUserForm, StyledDatePickers } from "../styles";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleXmark, faClose } from "@fortawesome/free-solid-svg-icons";
import { emptyUser } from "../utils/userSchema";
import { useFieldArray, Controller } from "react-hook-form";




export default function UsersForm({
	registerField,
	addUser,
	deleteUser,
	users,
	fieldArrayName,
	control,
}) {
	const handleAddUser = () => {
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
								userMapIndex={index}
								currentUser={item}
								{...{
									registerField,
									deleteUser,
									fieldArrayName,
									users,
									control,
								}}
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

function User({
	registerField,
	deleteUser,
	users,
	fieldArrayName,
	userMapIndex,
	currentUser,
	control,
}) {
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
					upperFieldArrayName={fieldArrayName}
					{...{ control, registerField }}
				/>
			</div>
		</>
	);
}




function NestedUserSchedulesArray({
	nestIndex,
	upperFieldArrayName,
	registerField,
	control,
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `${upperFieldArrayName}.${nestIndex}.preferedSchedule`,
	});
	const [wantsToAddSchedules, setWantsToAddSchedules] = useState(false);

	const handleAddSchedule = () => {
		setWantsToAddSchedules(true);
		append({
			min: "",
			max: "",
		});
	};
	const handleDeleteSchedule = () => {

	}
	return (
		<>
			{fields.map((scheduleField, fieldIndex) => {
				return (
					<StyledDatePickers className="schedule-container" key={scheduleField.id}>
						<Controller
							control={control}
							name={`${upperFieldArrayName}.${nestIndex}.preferedSchedule.${fieldIndex}.min`}
							render={({field}) => (
								<DatePicker
									placeholderText={"Start"}
									selected={field.value}
									onChange={(date) => field.onChange(date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={60}
									timeCaption="Time"
									dateFormat="h:mm aa"
								/>
							)}
						/>
							<span className="text-separator">to</span> 
						<Controller
							control={control}
							name={`${upperFieldArrayName}.${nestIndex}.preferedSchedule.${fieldIndex}.max`}
							render={({field}) => (
								<DatePicker
									placeholderText={"End"}
									selected={field.value}
									onChange={(date) => field.onChange(date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={60}
									timeCaption="Time"
									dateFormat="h:mm aa"
								/>	
							)}
						/>
						<button
							className="close-button"
							onClick={() => {
								remove(scheduleField.id)
							}}
						>
							<FontAwesomeIcon icon={faCircleXmark} />
						</button>
					</StyledDatePickers>	
					
				);
			})}

			<button
				onClick={handleAddSchedule}
				className="cta add-schedule"
				title="Add new schedule"
			>
				<FontAwesomeIcon icon={faPlus} className="add-icon" /> Add Schedule
			</button>
		</>
	);
}

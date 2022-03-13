import React, { useState } from "react";
import { StyledUserForm, StyledDatePickers } from "../styles";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faCircleXmark,
	faClose,
} from "@fortawesome/free-solid-svg-icons";
import { emptyUser } from "../utils/userSchema";
import { useFieldArray, Controller } from "react-hook-form";

export default React.memo(function UsersForm({
	registerField,
	addUser,
	deleteUser,
	users,
	fieldArrayName,
	control,
	submitForm
}) {
	const handleAddUser = () => {
		addUser(emptyUser);
	};

	return (
		<>
			<StyledUserForm onSubmit={submitForm}>
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
						<button className="cta start" title="Start conversion" onClick={submitForm}>
							START
						</button>
						<button
							className="cta add-user"
							title="Add new friend"
							type="submit"
							onClick={handleAddUser}
						>
							<FontAwesomeIcon icon={faPlus} className="add-icon" />
						</button>
					</div>
				</div>
			</StyledUserForm>
		</>
	);
});

const User = React.memo(function ({
	registerField,
	deleteUser,
	users,
	fieldArrayName,
	userMapIndex,
	currentUser,
	control,
}) {
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
						maxLength: {
							value: 40,
							message: "Username should be less than 40 characters"
						},
						minLength: {
							value: 2,
							message: "Username should be more than or equal to 2 characters"
						}
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
});

const NestedUserSchedulesArray = React.memo(function ({
	nestIndex,
	upperFieldArrayName,
	control,
	registerField
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
	console.log(fields.length);

	return (
		<>
			{fields.map((scheduleField, fieldIndex) => {
				return (
					<StyledDatePickers
						className="schedule-container"
						key={scheduleField.id}
					>
						<Controller
							control={control}
							name={`${upperFieldArrayName}.${nestIndex}.preferedSchedule.${fieldIndex}.min`}
							render={({ field }) => (
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
							render={({ field }) => (
								<DatePicker
									className="end-time-picker"
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
								remove(scheduleField.id);
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
});

import React, { useState } from "react";
import { StyledUserForm, StyledDatePickers } from "../styles";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faCircleXmark,
	faClose,
	faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import { emptyUser } from "../utils/userSchema";
import { useFieldArray, Controller } from "react-hook-form";


const timezonePrefix = 'GMT';

export default React.memo(function UsersForm({
	registerField,
	addUser,
	deleteUser,
	users,
	fieldArrayName,
	control,
	submitForm,
	errors
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
									errors
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

const User = function ({
	registerField,
	deleteUser,
	users,
	fieldArrayName,
	userMapIndex,
	currentUser,
	control,
	errors
}) {
	const [wantsToAddSchedules, setWantsToAddSchedules] = useState(false);
	const handleDeleteUser = (userIndex) => {
		deleteUser(userIndex);
	};
	
	
	const validateTimezoneInput = (currentText) => {
		{
			//TODO: CODE REVIEW
		}

		
		
		// If user is trying to delete "GMT" prefix
		if (currentText.substring(0, timezonePrefix.length) !== timezonePrefix) {
			return false;
		} else {
			// TODO: use a regex expression to only take +[2 digits hour]:[2 digits minutes] or -[2 digits hour]:[2 digits minutes] at most
			// We will need to have more than one regex, for each case maybe?
		}

		return true;
	}
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
				<div className="input-container">	
					<input
						type="text"
						placeholder="Username"
						autoComplete="off"
						{...registerField(`${fieldArrayName}.${userMapIndex}.username`, {
							required: "You must fill this field",
							maxLength: {
								value: 40,
								message: "Username is too long"
							},
							minLength: {
								value: 2,
								message: "Username is too short"
							}
						})}
					/>

					{
						//TODO: CODE REVIEW
					}
					{errors?.[fieldArrayName]?.[userMapIndex]?.username?.message && (
						<p className="error-message">
							<FontAwesomeIcon 
								icon={faTriangleExclamation}
								className="danger-icon"
							/>
							{errors?.[fieldArrayName]?.[userMapIndex]?.username?.message}							
						</p>
					)}

				</div> 
				<div className="input-container">
					{
						//TODO: CODE REVIEW
						//TODO: change the onclick event so that it changes the value the first time
					}
					<Controller 
						{...{control}}
						name={`${fieldArrayName}.${userMapIndex}.gmt`}
						render={ ({ field }) => (
							<input
								type="text"
								placeholder="Timezone (GMT)"
								autoComplete="off"
								onChange={(e) => {
									if (validateTimezoneInput(e.target.value)) {
										field.onChange(e)	
									}
								}}
								onClick={(e) => {
									if (field.value === "") {
										field.onChange(timezonePrefix)
									}
								}}
								value={field.value}
							/>
						)}
					/>
				</div>
				<NestedUserSchedulesArray
					nestIndex={userMapIndex}
					upperFieldArrayName={fieldArrayName}
					{...{ control, registerField }}
				/>
			</div>
		</>
	);
};

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

import React, { useState, useEffect } from "react";
import { StyledDatePickers } from "../styles";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faCircleXmark,
	faClose,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";		
import { useFieldArray, Controller } from "react-hook-form";


// REGEXS FOR VALIDATION
const timezonePrefix = "GMT";
const hoursTwoDigitsWithMinutesRegex = /[/+-\-](([01]?[0-2])|(12)):(([0-5][0-9])|59)$/; // 10:30
const hourSingleDigitWithMinutes = /([\+-\-]\d):(([0-5][0-9])|59)$/; // 9:30
const hoursTwoDigitsRegex = /[/+-\-](([01]?[0-2])|(12))$/; //10, 11, 12
const hourSingleDigitRegex = /[\+-\-]\d$/; // 2, 5, 9
const validCharRegex = /[0-9|:|\+|\-]/;

const User = function ({
	registerField,
	deleteUser,
	users,
	fieldArrayName,
	userMapIndex,
	currentUser,
	control,
	errors,
	watch
}) {
	const [wantsToAddSchedules, setWantsToAddSchedules] = useState(false);
	const handleDeleteUser = (userIndex) => {
		deleteUser(userIndex);
	};

	const validTimezoneCharacter = (e) => {
		{
			//TODO: CODE REVIEW
		}
		const currentText = e.target.value;
		const lastChar = currentText.charAt(currentText.length - 1);

		// First checks if the new character is valid
		if (lastChar.match(validCharRegex)) {
			return true;
		} else if (currentText === timezonePrefix) {
			//!git  We're catching the event when user has added a valid character to the input field, but wants to delete it: "GMT+" to "GMT"
			//! we need this because backspace (key fired when deleting) doesn't come inside of the event that we receive in this function
			//! When user presses backspaces, currentText passes from "GMT+" to "GMT", this is why the comparison gives true
			return true;
		}
		return false;
	};
	const validateTimezoneInput = (value) => {
		if (
			value.match(hoursTwoDigitsWithMinutesRegex) ||
			value.match(hoursTwoDigitsRegex) ||
			value.match(hourSingleDigitRegex) ||
			value.match(hourSingleDigitWithMinutes)
		) {
			return true;
		}
		return false;
	};
	return (
		<>
			<div className="tagline">Add a Friend</div>
			<div className="user-container">
				{users.length > 1 && (
					<button
						className="close-user"
						type="button"
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
								message: "Username is too long",
							},
							minLength: {
								value: 2,
								message: "Username is too short",
							},
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
					}
					<Controller
						control={control}
						name={`${fieldArrayName}.${userMapIndex}.gmt`}
						render={({ field }) => (
							<input
								type="text"
								placeholder="Timezone (GMT)"
								autoComplete="off"
								value={field.value}
								onChange={(e) => {
									if (validTimezoneCharacter(e)) {
										field.onChange(e);
									}
								}}
								onFocus={(e) => {
									if (field.value === "") {
										field.onChange(timezonePrefix);
									}
								}}
								onBlur={field.onBlur}
							/>
						)}
						rules={{
							minLength: {
								value: 5,
								message: "Invalid timezone",
							},
							maxLength: {
								value: 9,
								message: "Invalid timezone",
							},
							validate: (value) =>
								validateTimezoneInput(value) || "Invalid Timezone Format",
							required: "this must be filled",
						}}
					/>

					{errors?.[fieldArrayName]?.[userMapIndex]?.gmt?.message && (
						<p className="error-message">
							<FontAwesomeIcon
								icon={faTriangleExclamation}
								className="danger-icon"
							/>
							{errors?.[fieldArrayName]?.[userMapIndex]?.gmt?.message}
						</p>
					)}
				</div>
				<NestedUserSchedulesArray
					nestIndex={userMapIndex}
					upperFieldArrayName={fieldArrayName}
					{...{ control, registerField, errors, watch }}
				/>
			</div>
		</>
	);
};
//TODO: Make a func to validate if errors object has changed
const NestedUserSchedulesArray = function ({
	nestIndex,
	upperFieldArrayName,
	control,
	registerField,  
    errors,
	watch
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `${upperFieldArrayName}.${nestIndex}.preferedSchedule`,
	});
	const watchFieldArray = watch(`${upperFieldArrayName}.${nestIndex}.preferedSchedule`);
	const controlledFields = fields.map((field, index) => {
		return {
		...field,
		...watchFieldArray[index]
		};
	});

	const handleAddSchedule = () => {
		append({
			min: "",
			max: "",
		});
		
	};
    const validateTime = (val, fieldIndex) => {
		const minTime = controlledFields[fieldIndex].min !== "" ? controlledFields[fieldIndex].min.getHours() : null;
		const maxTime = controlledFields[fieldIndex].max !== "" ? controlledFields[fieldIndex].max.getHours() : null;
		// TODO we need to find a way to check that this schedule is not being interrupted by outside schedules
		//! we could map over controlled fields, then extract a range of hours (min to max) compare it to our current range of hours
		//! and see if they collide somehow, but how do we know if they collide? 

		if (minTime !== null && maxTime !== null) {
			if (minTime < maxTime) {
				return true;
			}
		} else if (minTime !== null || maxTime !== null) {
			return true;
		}
		// console.log("inside validation time", {
		// 	min: minTime,
		// 	max: maxTime
		// })
        return false;
    }
    // console.log(controlledFields, 'controlled fieldsos'); 
	// console.log(fields, "fields schedules");
    // console.log(errors, "errors from nested");
	return (
		<>
			{/*//TODO Fix bug: when there's text inside timezone input and you press add schedule, it acts as a submit button*/}
			{/*//TODO Validate that min is less than max */}
			{/*//TODO Switch over controlled inputs */}
			{controlledFields.map((scheduleField, fieldIndex) => {
				return (
					<StyledDatePickers
						className="schedule-container"
						key={scheduleField.id}
					>
                        {errors?.[upperFieldArrayName]?.[nestIndex]?.preferedSchedule?.[fieldIndex]?.min?.message && (
                            <FontAwesomeIcon icon={faTriangleExclamation} className="danger-icon"/>
                        )}
						<Controller
							control={control}
							name={`${upperFieldArrayName}.${nestIndex}.preferedSchedule.${fieldIndex}.min`}
							render={({ field }) => (
								<DatePicker
									placeholderText={"Start"}
									selected={field.value}
									onChange={(time) => {
										field.onChange(time);
										field.onBlur();
                                    }}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={60}
									timeCaption="Time"
									dateFormat="h:mm aa"
									{...field}
								/>
							)}
                            rules={{
                                required: "required",
								validate: (val) => validateTime(val, fieldIndex) || "Invalid Time"
                            }}
						/>
						<span className="text-separator">to</span>
						{errors?.[upperFieldArrayName]?.[nestIndex]?.preferedSchedule?.[fieldIndex]?.max?.message && (
							<FontAwesomeIcon icon={faTriangleExclamation} className="danger-icon"/>
                        )}
						<Controller
							control={control}
							name={`${upperFieldArrayName}.${nestIndex}.preferedSchedule.${fieldIndex}.max`}
							render={({ field }) => (
								<DatePicker
									className="end-time-picker"
									placeholderText={"End"}
									selected={field.value}
									onChange={(time) => {
                                        field.onChange(time);
										field.onBlur();
                                    }}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={60}
									timeCaption="Time"
									dateFormat="h:mm aa"
									{...field}
								/>
							)}
                            rules={{
                                required: "required"
                            }}
						/>
						<button
							className="close-button"
							type="button"
							onClick={() => {
								remove(fieldIndex);
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
				type="button"
			>
				<FontAwesomeIcon icon={faPlus} className="add-icon" /> Add Prefered
				Schedule
			</button>
		</>
	);
}

export default User;    

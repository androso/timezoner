import React, { useState } from "react";
import { StyledUserCard } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClose,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Controller } from "react-hook-form";
import { UsersSchedules } from ".";

// REGEXS FOR VALIDATION
const timezonePrefix = "GMT";
const hoursTwoDigitsWithMinutesRegex =
	/[/+-\-](([01]?[0-2])|(12)):(([0-5][0-9])|59)$/; // 10:30
const hourSingleDigitWithMinutes = /([\+-\-]\d):(([0-5][0-9])|59)$/; // 9:30
const hoursTwoDigitsRegex = /[/+-\-](([01]?[0-2])|(12))$/; //10, 11, 12
const hourSingleDigitRegex = /[\+-\-]\d$/; // 2, 5, 9
const validCharRegex = /[0-9|:|\+|\-]/;

const UserCard = function ({
	registerField,
	deleteUser,
	users,
	fieldArrayName,
	userMapIndex,
	currentUser,
	control,
	errors,
	watch,
}) {

	return (
		<>
			<div className="tagline">Add a Friend</div>

			<StyledUserCard className="user-container">
				{users.length > 1 && (
					<button
						className="close-user"
						type="button"
						onClick={() => {
							handleDeleteUser(() => deleteUser(userMapIndex));
						}}
					>
						<FontAwesomeIcon icon={faClose} className="close-user-icon" />
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
				<UsersSchedules
					nestIndex={userMapIndex}
					upperFieldArrayName={fieldArrayName}
					{...{ control, registerField, errors, watch }}
				/>
			</StyledUserCard>
		</>
	);
};

function validateTimezoneInput(value) {
	if (
		value.match(hoursTwoDigitsWithMinutesRegex) ||
		value.match(hoursTwoDigitsRegex) ||
		value.match(hourSingleDigitRegex) ||
		value.match(hourSingleDigitWithMinutes)
	) {
		return true;
	}
	return false;
}
function validTimezoneCharacter(e) {
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
export default UserCard;

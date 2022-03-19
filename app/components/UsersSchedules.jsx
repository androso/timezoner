import React from "react";
import { StyledDatePickers } from "../styles";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faCircleXmark,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useFieldArray, Controller } from "react-hook-form";

export default function UsersSchedules(props) {
	const {
		nestIndex,
		upperFieldArrayName,
		control,
		registerField,
		errors,
		watch,
	} = props;

	const { fields, append, remove } = useFieldArray({
		control,
		name: `${upperFieldArrayName}.${nestIndex}.preferedSchedule`,
	});
	const watchFieldArray = watch(
		`${upperFieldArrayName}.${nestIndex}.preferedSchedule`
	);
	const controlledFields = fields.map((field, index) => {
		return {
			...field,
			...watchFieldArray[index],
		};
	});

	return (
		<>
			{/*//TODO Validate that min is less than max */}

			{controlledFields.map((scheduleField, fieldIndex) => {
				return (
					<StyledDatePickers
						className="schedule-container"
						key={scheduleField.id}
					>
						{errors?.[upperFieldArrayName]?.[nestIndex]?.preferedSchedule?.[
							fieldIndex
						]?.min?.message && (
							<FontAwesomeIcon
								icon={faTriangleExclamation}
								className="danger-icon single"
								title={
									errors?.[upperFieldArrayName]?.[nestIndex]
										?.preferedSchedule?.[fieldIndex]?.min?.message
								}
							/>
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
								validate: {
									hourRange: (val) =>
										validHourRange(val, fieldIndex, controlledFields) ||
										"Invalid Hour Range",
									scheduleCollision: (val) =>
										validSchedule(val, fieldIndex, controlledFields) ||
										"There are collisions between schedules",
								},
							}}
						/>
						<span className="text-separator">to</span>
						{errors?.[upperFieldArrayName]?.[nestIndex]?.preferedSchedule?.[
							fieldIndex
						]?.max?.message && (
							<FontAwesomeIcon
								icon={faTriangleExclamation}
								className="danger-icon single"
								title={
									errors?.[upperFieldArrayName]?.[nestIndex]
										?.preferedSchedule?.[fieldIndex]?.max?.message
								}
							/>
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
								required: "required",
								validate: {
									hourRange: (val) =>
										validHourRange(val, fieldIndex, controlledFields) ||
										"Invalid Hour Range",
									scheduleCollision: (val) =>
										validSchedule(val, fieldIndex, controlledFields) ||
										"There are collisions between schedules",
								},
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
				onClick={() => handleAddSchedule(append)}
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

const handleAddSchedule = (append) => {
	append({
		min: "",
		max: "",
	});
};

const validSchedule = (val, fieldIndex, controlledFields) => {
	
	const minHour =
		controlledFields[fieldIndex].min !== ""
			? controlledFields[fieldIndex].min.getHours()
			: null;
	const maxHour =
		controlledFields[fieldIndex].max !== ""
			? controlledFields[fieldIndex].max.getHours()
			: null;

	if (minHour !== null && maxHour !== null) {
		
		if (minHour > maxHour) {
			return false;
		}

		const currentHoursRange = getRangeBetweenHours(minHour, maxHour);
		let collisionsExists = false;
		controlledFields.every((scheduleField, index) => {
			if (scheduleField.min === "" || scheduleField.max === "") {
				return true; //skip
			}
			const externalHoursRange = getRangeBetweenHours(
				scheduleField.min.getHours(),
				scheduleField.max.getHours()
			);
			if (arraysAreEqual(currentHoursRange, externalHoursRange)) {
				// if we're iterating over the current field
				return true; //skip
			}
			const smallCollisions = currentHoursRange.some(
				(hour) => externalHoursRange.indexOf(hour) >= 0
			);
			
			if (smallCollisions) {
				// console.log(
				// 	currentHoursRange,
				// 	externalHoursRange,
				// 	"collision between these two"
				// );
				collisionsExists = true;
				return false;
			}
			// console.log("no collision here");
			return true;
		});

		if (collisionsExists) {
			return false;
		}
	} else if (minHour !== null || maxHour !== null) {
		const existingHour = ( minHour !== null ? minHour : maxHour);

		let collisionsExists = false;

		// we use .every so that we can exit the first time we find a collision and don't waste machine power
		controlledFields.every((scheduleField) => {
			if (scheduleField.min === "" || scheduleField.max === "") {
				return true; //skip because user has not filled this time field
			}
			const externalHoursRange = getRangeBetweenHours(
				scheduleField.min.getHours(),
				scheduleField.max.getHours()
			);
			const collision = externalHoursRange.indexOf(existingHour);
			if (collision >= 0) {
				console.log(
					currentHoursRange,
					externalHoursRange,
					"collision between these two"
				);
				collisionsExists = true;
				return false;
			}
			if (collisionsExists) {
				return false; // we break off the loop
			}
		})

	}
	return true;
};

const validHourRange = (val, fieldIndex, controlledFields) => {
	const minHour =
		controlledFields[fieldIndex].min !== ""
			? controlledFields[fieldIndex].min.getHours()
			: null;
	const maxHour =
		controlledFields[fieldIndex].max !== ""
			? controlledFields[fieldIndex].max.getHours()
			: null;

	if (minHour !== null && maxHour !== null) {
		if (minHour > maxHour) {
			return false;
		}
	} else if (minHour !== null || maxHour !== null) {
		return true;
	}

	return true;
}
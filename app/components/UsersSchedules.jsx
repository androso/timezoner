import React, { useState, useEffect } from "react";
import { StyledDatePickers, StyledUserCard } from "../styles";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faCircleXmark,
	faClose,
	faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useFieldArray, Controller } from "react-hook-form";
import { validSchedule, validHourRange } from "../utils/utils";

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

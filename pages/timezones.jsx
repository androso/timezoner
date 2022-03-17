import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StyledTimezone } from "../app/styles";
import {
	isPrefered,
	standardizeHours,
	getHoursConverted,
	getFormattedHour,
	defaultHours
} from "../app/utils/utils";

export default function timezones() {
	const router = useRouter();
	const [submittedForm, setSubmittedForm] = useState(null);
	const [users, setUsers] = useState(null);
	const [userOfReference, setUserOfReference] = useState(null);
	const [hoursConverted, setHoursConverted] = useState(null);

	useEffect(() => {
		const jsonForm = window.localStorage.getItem("user-form");
		const parsedForm = JSON.parse(jsonForm);

		if (parsedForm) {
			setSubmittedForm(parsedForm);
		} else {
			router.push("/", undefined, { shallow: true });
		}

		const initialUsers = parsedForm.map((user, index) => {
			if (index === 0) {
				const newUser = { ...user };
				newUser.defaultHours = defaultHours;
				newUser.standardizedHours = standardizeHours(newUser);
				newUser.gmt = user.gmt.substring(3);
				return newUser;
			}
			return user;
		});
		
		setUsers(initialUsers);
		setUserOfReference(initialUsers[0]);

	}, []);

	

	return (
		<>
			{submittedForm ? (
				<StyledTimezone>
					<div className="bf-container bf-p-t-2 bf-p-b-2">
						<div className="upper-text-container">
							<h1>Timezones converted</h1>
							<h4>Now just pick a matching hour :)</h4>
						</div>
					</div>
					<div className="bf-table-responsive">
						{/* <TimeTable /> */}
					</div>
				</StyledTimezone>
			) : (
				<div>Fetching data</div>
			)}
		</>
	);
}

function TimeTable({ users, defaultHours, hoursConverted }) {
	return (
		<table className="bf-table">
			<caption>Data data data zzz</caption>
			<thead>
				<tr>
					<th className="username">Index</th>
					{users !== null &&
						users.map((user, index) => {
							return (
								<th key={index} className="username">
									{user.username}
								</th>
							);
						})}
				</tr>
			</thead>
			<tbody>
				{defaultHours.map((rowIndex) => {
					return (
						<tr key={rowIndex}>
							<td className="index-column">{rowIndex}</td>
							{hoursConverted &&
								users.map((user, index) => {
									const formattedHour = getFormattedHour(
										user.defaultHours[rowIndex - 1]
									);
									const hourDigit = user.defaultHours[rowIndex - 1];
									return (
										<td
											key={`${rowIndex}-${user.username}`}
											className={isPrefered(user.preferedSchedule, hourDigit)}
										>
											{formattedHour}
										</td>
									);
								})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

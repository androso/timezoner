import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StyledTimezone } from "../app/styles";
import {
	isPrefered,
	standardizeHours,
	getHoursConverted,
	getFormattedHour,
} from "../app/utils/utils";

export default function timezones() {
	const [submittedForm, setSubmittedForm] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const form = window.localStorage.getItem("user-form");
		if (form) {
			setSubmittedForm(JSON.parse(form));
		} else {
			router.push("/", undefined, { shallow: true });
		}
	}, []);

	useEffect(() => {
		console.log(submittedForm);
	}, [submittedForm]);

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
						<TimeTable />
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

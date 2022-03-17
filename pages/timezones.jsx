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
	const [users, setUsers] = useState(null);
	const [userOfReference, setUserOfReference] = useState(null);
	const [hoursConverted, setHoursConverted] = useState(null);

	useEffect(() => {
		const jsonForm = window.localStorage.getItem("user-form");
		const parsedForm = JSON.parse(jsonForm);

		if (parsedForm === null) {
			router.push("/", undefined, { shallow: true });
			return false;
		}

		const initialUsers = parsedForm.map((user, index) => {
			if (index === 0) {
				const newUser = { ...user };
				newUser.defaultHours = defaultHours;
				newUser.gmt = user.gmt.substring(3);
				newUser.standardizedHours = standardizeHours(newUser);
				return newUser;
			} else {
				const newUser = {...user};
				newUser.gmt = user.gmt.substring(3);
				return newUser;
			}
		});

		setUsers(initialUsers);
		setUserOfReference(initialUsers[0]);

	}, []);

	useEffect(() => {
		if (users) {
			console.log(users);
		}
	}, [users]);

	useEffect(() => {
		// Converting hours of everyone else based on first user
		if (userOfReference != null) {
			// when user of reference is set, we should convert the hours of everyone
			// We pick userOfReference and we loop through each one after it
			const usersWithHoursConverted = users.map((user, index) => {
				if (index === 0) {
					return user;
				}
				const newUser = { ...user };
				newUser.defaultHours = getHoursConverted(userOfReference, user);
				return newUser;
			});
			setUsers(usersWithHoursConverted);
			setHoursConverted(true);
		}
	}, [userOfReference]);

	return (
		<>
			{users ? (
				<StyledTimezone>
					<div className="bf-container bf-p-t-2 bf-p-b-2">
						<div className="upper-text-container">
							<h1>Timezones converted</h1>
							<h4>Now just pick a matching hour :)</h4>
						</div>
					</div>
					<div className="bf-table-responsive">
						<TimeTable 
							{...{users, defaultHours, hoursConverted}}
						/>
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

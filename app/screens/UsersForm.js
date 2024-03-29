import React, { useState } from "react";
import { StyledUserForm } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { emptyUser } from "../utils/userSchema";
import {  UserCard } from "../components";

export default React.memo(function UsersForm({
	registerField,
	addUser,
	deleteUser,
	users,
	fieldArrayName,
	control,
	errors,
	handleSubmit,
	submitForm,
	watch,
}) {
	const handleAddUser = () => {
		addUser(emptyUser);
	};

	return (
		<>
			<StyledUserForm onSubmit={handleSubmit(submitForm)}>
				<div className="upper-text-container">
					<h1 className="title">Schedule between timezones</h1>
				</div>
				<div className="form-container">
					{users.map((item, index) => {
						return (
							<UserCard
								key={item.id}
								userMapIndex={index}
								currentUser={item}
								{...{
									registerField,
									deleteUser,
									fieldArrayName,
									users,
									control,
									errors,
									watch,
								}}
							/>
						);
					})}

					<div className="form-footer-actions">
						<button
							className="cta start"
							title="Start conversion"
							onClick={handleSubmit(submitForm)}
							type="submit"
						>
							START
						</button>
						<button
							className="cta add-user"
							title="Add new friend"
							type="button"
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

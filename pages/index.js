import { useState, useEffect } from "react";
import Select from "react-select";
import { HeadData } from "../app/components";
import { UsersForm, Timezones } from "../app/screens";
import { GlobalStyle } from "../app/styles";
import styled from "styled-components";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { emptyUser } from "../app/utils/userSchema";
import { useLocalStorage } from "../app/hooks";

export default function Home() {
	const [screen, setScreen] = useState(0);
	const [submittedForm, setSubmittedForm] = useLocalStorage("user-form", null);
	
	const {
		register,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			usersForms: [{... emptyUser}],
		},
		mode: "onBlur"
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "usersForms",
	});
	
	const submitForm = (data) => {
		setSubmittedForm(data.usersForms);
		setScreen((prevScreen) => prevScreen + 1);
	}	

	
	return (
		<div className="container">
			<GlobalStyle />
			<HeadData />

			<main className="main">
				{screen === 0 ? (
					<UsersForm
						registerField={register}
						addUser={append}
						deleteUser={remove}
						users={fields}
						fieldArrayName="usersForms"
						{...{ control, errors, handleSubmit, submitForm, watch}}
					/>
				) : screen === 1 ? (
					<Timezones {...{submittedForm}}/>
				) : (
					""
				)}
			</main>

			<StyledFooter>
				<p>
					Made with 💖 by{" "}
					<a
						href="https://anibalandrade.me/"
						target="_blank"
						rel="noopener noreferrer"
						className="portfolio"
					>
						androso
					</a>
				</p>
			</StyledFooter>
		</div>
	);
}

const StyledFooter = styled.footer`
	display: flex;
	padding: 2rem 0;
	border-top: 1px solid #eaeaea;
	justify-content: center;

	.portfolio {
		font-weight: 700;
	}
	.portfolio:hover {
		text-decoration: underline;
	}
`;

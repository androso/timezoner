import { useState, useEffect } from "react";
import Select from "react-select";
import { HeadData } from "../components";
import { UsersForm, Timezones } from "../screens";
import { GlobalStyle } from "../styles";
import styled from "styled-components";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { emptyUser } from "../utils/userSchema";

export default function Home() {
	const [screen, setScreen] = useState(0);
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
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "usersForms",
	});
	useEffect(() => {
		// console.log(emptyUser, "user schema ");
	}, []);
	const submitForm = (data) => console.log(data);

	console.log(watch("usersForms"), "fields");
	// console.log(errors, "errors object");
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
						control={control}
					/>
				) : screen === 1 ? (
					<Timezones />
				) : (
					""
				)}
				{/* <p>{watch()}</p>  */}
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

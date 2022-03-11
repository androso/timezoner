import { useState } from "react";
import Select from "react-select";
import { HeadData } from "../components";
import { UsersForm, Timezones } from "../screens";
import { GlobalStyle } from "../styles";
import styled from "styled-components";
import { useForm, useFieldArray } from "react-hook-form";

export default function Home() {
	const [screen, setScreen] = useState(0);
	const {
		register,
		control,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();
	
	const { fields, append } = useFieldArray({
		control,
		name: "usersFormsList",
	});

	const submitForm = (data) => console.log(data);

	return (
		<div className="container">
			<GlobalStyle />
			<HeadData />

			<main className="main">
				{screen === 0 ? (
					<UsersForm
						registerField={register}
						handleSubmit={handleSubmit(submitForm)}
						formErrors={errors}
					/>
				) : screen === 1 ? (
					<Timezones />
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

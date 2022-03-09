import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import { HeadData } from "../components";
import { UsersForm, Timezones } from "../screens";
import { GlobalStyle } from "../styles";
import styled from "styled-components";

export default function Home() {
	const [screen, setScreen] = useState(0);

	return (
		<div className="container">
			<GlobalStyle />
			<HeadData />

			<main className="main">
				{screen === 0 ? <UsersForm /> : screen === 1 ? <Timezones /> : ""}
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

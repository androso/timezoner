import styled from "styled-components";
import StyledBullframe from "./StyledBullframe";

const StyledTimezoneTable = styled.div`
	${StyledBullframe}
    
	.upper-text-container {
		text-align: center !important;
		padding-top: 30px;
		margin-bottom: 20px;
	}
	.upper-text-container h1 {
		max-width: 70%;
		margin: 0 auto;
		margin-bottom: 10px;
		line-height: 1.3;
	}
	.upper-text-container h4 {
		font-size: 1.2rem;
		font-weight: 500;
	}
	.index-column,
	table {
		text-align: center;
	}

	td,
	.username {
		border: 2px solid rgb(197, 186, 186);
		padding: 10px 0px;
	}
	td.index-column {
		width: 80px !important;
	}
	.username {
		background: #f2f2f2;
	}
	.highlighted {
		background-color: var(--highlighted-cell);
		color: #fafafa;
	}

	td:not(.highlighted) {
		background-color: #fafafa;
		color: #333;
	}
	td:not(.index-column) {
		min-width: 180px;
	}
`;
export default StyledTimezoneTable;

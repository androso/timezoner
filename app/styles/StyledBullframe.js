import { css } from "styled-components";

const StyledBullframe = css`
	/* Styles from bullframe for the table */
	.bf-p-b-2 {
		padding-bottom: 1rem !important;
	}
	.bf-p-t-2 {
		padding-top: 1rem !important;
	}

	.bf-container {
		box-sizing: content-box;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	.bf-container:after,
	.bf-container:before {
		content: " ";
		display: table;
	}

	.bf-container:after {
		clear: both;
	}
	.bf-container {
		max-width: 1140px;
		max-width: 114rem;
	}

	.bf-table-responsive {
		-ms-overflow-style: scrollbar;
		overflow-x: auto;
		overflow-y: hidden;
		max-width: 1000px;
		margin: 0 auto;
	}
	.bf-table-responsive table {
		margin-bottom: 0.5rem;
		width: 100%;
	}
	.bf-table-responsive.scrollbar {
		-webkit-overflow-scrolling: auto;
	}

	table {
		border-collapse: collapse;
		max-width: 100%;
	}
	tbody,
	td,
	tfoot,
	th,
	thead,
	tr {
		border: 0 solid;
		border-color: inherit;
	}
	thead th {
		vertical-align: bottom;
	}
	td,
	th {
		vertical-align: top;
	}
	th {
		font-weight: 700;
		text-align: inherit;
	}
	caption {
		caption-side: bottom;
		color: #999;
		font-size: 90%;
		line-height: 1.375;
		padding-bottom: 0.5rem;
		padding-top: 0.5rem;
		text-align: left;
	}
	.bf-table td,
	.bf-table th {
		border-bottom: 1px solid #999;
		margin-bottom: 0.5rem;
		padding: 1rem;
	}
`;
export default StyledBullframe;

import { css } from "styled-components";

const variables = css`
	:root {
		--green-strong: #6b705c;
		--green-pale: #beccbc;
		--black-pale: #454545;
		--black-dark: #1d1d1d;
		--black-pale: #333;
		--black: #000;
		--white: #fafafa;
		--orange-pale: #f8c891;
		--yellow: #fffbb1; 

		--font-stack: "Poppins", "Inter", "Roboto", -apple-system,
			BlinkMacSystemFont, system-ui, sans-serif;

		--fz-xxs: 12px;
		--fz-xs: 13px;
		--fz-sm: 14px;
		--fz-md: 16px;
		--fz-lg: 18px;
		--fz-xl: 20px;
		--fz-xxl: 24px;

        --site-max-width:: 800px;

        --border-radius-subtle: 5px;
        --border-radius-pill: 9px;
	}
`;

export default variables;

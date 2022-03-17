import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
                <div>data fetched!</div>
            ) : (
                <div>Fetching data</div>
            )}
        </>
    );
}

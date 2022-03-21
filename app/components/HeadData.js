import React, {useEffect} from "react";
import Head from "next/head";
import Script from "next/script"; 
export default function HeadData() {
	return (
		<>
			<meta
				name="description"
				content="Web app that makes easier scheduling with your friends from all around the world"
			/>
			<title>Timezoner</title>
			<link rel="icon" href="/favicon.ico" />
		
		</>
	);
}

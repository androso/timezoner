export const getRangeBetweenHours = (min, max) => {
	let rangeOfHours = [];
	for (let i = min; i <= max; i++) {
		rangeOfHours.push(i);
	}
	return rangeOfHours;
    // if min and max = 8 - 15
    // range = [8, 9, 10, 11, 12, 13, 14, 15 ]
};


export const arraysAreEqual = (a, b) => {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
};


export const isPrefered = (preferedSchedule, hourDigit) => {
	// Will return an array of classNames
	return preferedSchedule
		.map((schedule) => {
			const minHour = new Date(schedule.min).getHours();
			const maxHour = new Date(schedule.max).getHours();

			if (hourDigit >= minHour && hourDigit <= maxHour) {
				return "highlighted";
			}
			return "";
		})
		.join("");
}


export const standardizeHours = (user) => {
	// The standard that we conver to is GMT 0
	const hoursOffset = parseFloat(user.gmt);

	const standardHours = user.defaultHours.map((hour) => {
		// 10 + (-3) = 7
		// 10 + 3 = 13
		const hourConverted = hour - hoursOffset;

		// If hour = 1 and timezone is GMT-3, hour + offset will be -2,
		// we need to convert this -2 to 24 format, so that we return 22, representing 22pm
		if (hourConverted === 0) {
			return 24; // Representing midnigth (12am)
		} else if (hourConverted < 0) {
			return 24 + hourConverted; // to get 10pm, 11pm, ... 24 + (-3) will return 21, representing 21pm
		} else if (hourConverted > 24) {
			return hourConverted - 24; // to get 1am, 2am, ... 25 - 24 will return 1, representing 1am
		}

		return hourConverted;
	});

	return standardHours;
}

export const getHoursConverted = (userOfReference, currentUser) => {
	const numberPattern = /-?\d+/g;
	const hoursToConvertFrom = userOfReference.standardizedHours;

	const hoursOffset = Number(currentUser.gmt.match(numberPattern)[0]);

	// Some timezones will end with decimal numbers, ex: GMT+5:30 (india),
	// so we extract the minutes and convert them to hours format
	const minutesOffset = Number(currentUser.gmt.match(numberPattern)[1]) / 60;

	const convertedHours = hoursToConvertFrom.map((hour) => {
		if (!isNaN(minutesOffset)) {
			var hourConverted = hour + hoursOffset + minutesOffset;
		} else {
			var hourConverted = hour + hoursOffset;
		}

		// If it's greater or equal than 25, we want to return its 24h format equivalent
		if (hourConverted >= 25) {
			return hourConverted - 24;
		} else if (hourConverted < 0) {
			return 24 + hourConverted; // to get 10pm, 11pm, ... 24 + (-3) will return 21, representing 21pm
		} else if (hourConverted === 0) {
			return 24; // Representing midnigth (12am)
		}

		return hourConverted;
	});
	return convertedHours;
}

export const getFormattedHour = (hourDigit) => {
	if (hourDigit % 1 === 0) {
		if (hourDigit < 12) {
			return `${hourDigit} AM`;
		} else {
			if (hourDigit >= 12 && hourDigit < 13) {
				return `${hourDigit} PM`;
			} else if (hourDigit >= 24 && hourDigit < 25) {
				const formattedHour = hourDigit - 12;
				return `${formattedHour} AM`;
			} else {
				const formattedHour = hourDigit - 12;
				return `${formattedHour} PM`;
			}
		}
	} else {
		const minutes = (hourDigit % 1) * 60;
		const hour = parseInt(hourDigit);
		if (hourDigit < 12) {
			return `${hour}:${minutes} AM`;
		} else {
			if (hourDigit >= 12 && hourDigit < 13) {
				return `${hour}:${minutes} PM`;
			} else if (hourDigit >= 24 && hourDigit < 25) {
				const formattedHour = hourDigit - 12;
				return `${hour}:${minutes} AM`;
			} else {
				const formattedHour = hourDigit - 12;
				return `${hour}:${minutes} PM`;
			}
		}
	}
}
export const defaultHours = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24,
];

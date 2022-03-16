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

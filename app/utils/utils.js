export const getRangeBetweenHours = (min, max) => {
    let rangeOfHours = [];
    for (let i = min + 1; i < max; i++) {
        rangeOfHours.push(i);
    }
    return rangeOfHours;
}

// 8 - 15
// 9; 9 < 15
// [9, 10, 11, 12, 13, 14]
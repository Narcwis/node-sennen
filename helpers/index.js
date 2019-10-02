const isBefore = require("date-fns/isBefore");
const parse = require("date-fns/parse");

const getRandomInRange = (from, to, fixed) => {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    // taken from https://stackoverflow.com/questions/6878761/javascript-how-to-create-random-longitude-and-latitudes
};

const latitude = () => {
    return getRandomInRange(-90, 90, 7);
};

const longitude = () => {
    return getRandomInRange(-180, 180, 7);
};

const getCoordinatesList = arrayLength => {
    const list = new Array(arrayLength).fill(0);
    return list.map(() => {
        return { lat: latitude(), lng: longitude() };
    });
};

const timeParser = time => {
    return parse(time, "h:mm:ss a", new Date());
};

const getEarliestSunriseIndex = (array, timeParser) => {
    let index = 0;
    let earliestSunrise = timeParser("11:59:59 PM");
    for (let i = 0; i < array.length; i++) {
        if (isBefore(timeParser(array[i].results.sunrise), earliestSunrise)) {
            earliestSunrise = timeParser(array[i].results.sunrise);
            index = i;
        }
    }
    return index;
};

module.exports = { timeParser, getCoordinatesList, getRandomInRange, getEarliestSunriseIndex };

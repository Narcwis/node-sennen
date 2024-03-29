const axios = require("./helpers/axios");
const { getCoordinatesList, getRandomInRange, timeParser, getEarliestSunriseIndex } = require("./helpers");

const getData = (lat, lng) => {
    return axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`);
};

(async () => {
    const coordsList = getCoordinatesList(100);
    const promiseList = coordsList.map(i => getData(i.lat, i.lng));
    const dataList = await Promise.all(promiseList);
    const earliestSunriseIndex = getEarliestSunriseIndex(dataList, timeParser);
    const { sunrise: earliestSunrise, day_length: earliestSunriseDayLength } = dataList[earliestSunriseIndex].results;
    console.info(`The earliest sunrise is ${earliestSunrise} and the day length for it is ${earliestSunriseDayLength}`);
    coordsList.forEach((coord, index) => {
        const {
            results: { sunrise, sunset }
        } = dataList[index];
        console.info(
            `When located at latitude ${coord.lat} and longitutde ${coord.lng}, sunrise happens at ${sunrise} and sunset happens at ${sunset}`
        );
    });
})();

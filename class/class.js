const axios = require("../helpers/axios");
const { timeParser, getEarliestSunriseIndex } = require("../helpers");
class BallOfFireDetails {
    constructor(listOfCoordinates) {
        this.listOfCoordinates = listOfCoordinates;
    }

    getPromiseForCoordinates(lat, lng) {
        return axios.get(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`);
    }

    async getBallOfFireDetails() {
        const promiseList = this.listOfCoordinates.map(i => this.getPromiseForCoordinates(i.lat, i.lng));
        try {
            return { coordinates: this.listOfCoordinates, data: await Promise.all(promiseList) };
        } catch (error) {
            console.error(`There was an error when getting data from API: ${error.code}`);
            return null;
        }
    }

    printEarliestSunsetDayLength({ data }) {
        const earliestSunriseIndex = getEarliestSunriseIndex(data, timeParser);
        const { sunrise: earliestSunrise, day_length: earliestSunriseDayLength } = data[earliestSunriseIndex].results;
        console.info(`The earliest sunrise is ${earliestSunrise} and the day length for it is ${earliestSunriseDayLength}`);
    }

    printSunsetAndSunriseResults({ data, coordinates }) {
        coordinates.forEach((coord, index) => {
            const {
                results: { sunrise, sunset }
            } = data[index];
            console.info(
                `When located at latitude ${coord.lat} and longitutde ${coord.lng}, sunrise happens at ${sunrise} and sunset happens at ${sunset}`
            );
        });
    }
}

module.exports = BallOfFireDetails;

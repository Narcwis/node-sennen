const BallOfFireDetails = require("./class");
const { getCoordinatesList } = require("../helpers");

(async () => {
    const fireBallApi = new BallOfFireDetails(getCoordinatesList(100));
    const dataFromApi = await fireBallApi.getBallOfFireDetails();
    if (dataFromApi !== null) {
        fireBallApi.printEarliestSunsetDayLength(dataFromApi);
        fireBallApi.printSunsetAndSunriseResults(dataFromApi);
    } else {
        console.error("Something went wrong when getting data.");
    }
})();

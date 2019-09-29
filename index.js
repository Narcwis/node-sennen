const R = require('ramda');
const rp = require('request-promise-native');
const coords = require('./setup');

require('./setup');

const getData = (lat, lng) => {
    return rp(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}`);
};

(async () => {
    const coordsList = coords();
    const promiseList = coordsList.map(i => getData(i.lat, i.lng));
    const dataList = await Promise.all(promiseList);
    coordsList.forEach((coord, index) => {
        const {
            results: { sunrise, sunset }
        } = JSON.parse(dataList[index]);
        console.info(
            `When located at latitude ${coord.lat} and longitutde ${coord.lng}, sunrise happens at ${sunrise} and sunset happens at ${sunset}`
        );
    });
})();

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

const getCoordinatesList = () => {
    const list = new Array(5).fill(0);
    return list.map(() => {
        return { lat: latitude(), lng: longitude() };
    });
};

module.exports = getCoordinatesList;

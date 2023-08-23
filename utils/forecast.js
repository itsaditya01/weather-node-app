const request = require("request");

const forecast = ({ longitude, lattitude } = {}, callback) => {
  const url =
    "https://api.weatherapi.com/v1/current.json?key=528b88a54e054e2bbbd125231232208&q=" +
    lattitude +
    "," +
    longitude;

  request({ url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to server.", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const data = response.body;
      callback(undefined, data.current);
    }
  });
};

module.exports = forecast;

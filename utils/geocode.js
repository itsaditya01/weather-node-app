const request = require("request");

const geocode = (address, callback) => {
  const geoCodingUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibGVyZWoxMzI4NSIsImEiOiJjbGxtY2Z6ZWQwam94M2ZuZjA2MzBzMmppIn0.xF7YyH2H7nhuMY0nWrgWcQ";

  request({ url: geoCodingUrl, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to server.", undefined);
    } else if (!response.body.features.length) {
      callback("Unable to find location. Please try again");
    } else {
      const data = response.body;
      const longitude = data.features[0].center[0];
      const lattitude = data.features[0].center[1];
      callback(undefined, {
        longitude,
        lattitude,
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

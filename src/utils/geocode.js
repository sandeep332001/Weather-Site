const request = require("request");
const geoCode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FuZGVlcDAzMDMwMSIsImEiOiJja28wN2d1cGkwM204MnZyd3Z0ZGN5bGUwIn0.TcHoKNyurAXsybuAWX6kTg&limit=1`;

  request(
    {
      url: geocodeURL,
      json: true,
    },
    (error, Response) => {
      if (error) {
        callback("Unable to connect to loacation services!", undefined);
      } else if (Response.body.features.length === 0) {
        callback("Unable to find location. Try another search ", undefined);
      } else {
        callback(undefined, {
          lati: Response.body.features[0].center[0],
          long: Response.body.features[0].center[1],
          location: Response.body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geoCode;

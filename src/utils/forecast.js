const request = require("request");

const foreCast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3cd2cf507b1b6321b0f41af7cc49a762&query=${lat},${long}`;

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to loacation services!", undefined);
      } else if (body.error) {
        callback("Unable to find location. Try another search ", undefined);
      } else {
        callback(
          undefined,
          {
            body: body,
          }
          //  {temperature: `Temperature is ${body.current.temperature}`,
        );
      }
    }
  );
};

module.exports = foreCast;

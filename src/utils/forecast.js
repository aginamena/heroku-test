const request = require("request");

const forcast = (lat, long, callback) => {
    const baseURL = "http://api.weatherstack.com/current?"
    const access_key = "access_key=07d7b46eda63acceeb3b2ea4509d33e4&"
    const query = "query=" + lat + "," + long;
    const url = baseURL + access_key + query;
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback("can't connect to web server", undefined)
        }
        else if (res.body.error) {
            callback("Input address is not valid", undefined);
        } else {
            const { temperature, feelslike } = res.body.current;
            callback(undefined, `The temperature is ${temperature} degrees but it feels like ${feelslike} degrees`)
        }

    })
}

module.exports = forcast;
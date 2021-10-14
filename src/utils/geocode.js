const request = require("request");

const geocode = (address, callback) => {
    const baseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) + ".json?"
    api_key = "access_token=pk.eyJ1IjoibWVuYWFnaW5hIiwiYSI6ImNrbmpvcGJsbTAwbm8yc24wOWZraGdjOGEifQ.75zDg1sZQPOLDQAd6Mjmww";

    const url = baseURL + api_key
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("can't connect to web server", undefined);
        }
        else if (response.body.features.length == 0) {
            callback("Input address is not valid", undefined);
        }
        else {
            const [lat, long] = response.body.features[0].center;

            callback(undefined, {
                latitude: lat,
                longitude: long,
                location: address
            });
        }
    })
}

module.exports = geocode;
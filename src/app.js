const express = require("express"); // we want to use express
const app = express(); // we want to run express
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//we want to expose all static components of our app to the webserver
app.use(express.static(path.join(__dirname, "../public/")));
app.set("view-engine", "hbs");

app.get("", (req, res) => {
    res.render(path.join(__dirname, "../views/index.hbs"),
        {
            title: "weather app",
            name: "Mena agina"
        })
})

app.get("/help", (req, res) => {

    res.render(path.join(__dirname, "../views/help.hbs"), {
        message: "Welcome to help page"
    })

})
app.get("/about", (req, res) => {

    res.render(path.join(__dirname, "../views/about.hbs"), {
        title: "about page",
        name: "mena agina"
    }
    )
})
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "provide an address"
        })
        return;
    }
    geocode(req.query.address, (error, data) => {
        if (error == "can't connect to web server") {
            res.send({
                error: error
            })
        }
        else if (error == "Input address is not valid") {
            res.send({
                error: error
            })
        }
        else {
            const { latitude, longitude } = data;

            forecast(latitude, longitude, (error, data) => {
                if (error == "can't connect to web server") {
                    res.send({
                        error: error
                    })
                }
                else if (error == "Input address is not valid") {
                    res.send({
                        error: error
                    })
                } else {
                    res.send({
                        latitude: latitude,
                        longitude: longitude,
                        "web_info": data
                    })
                }
            })
        }
    })

})
app.get("/help/*", (req, res) => {
    res.render(path.join(__dirname, "../views/ErrorPage.hbs"),
        {
            errorMessage: "You have to go back to help page"
        }

    )
})

app.get("*", (req, res) => {
    res.render(path.join(__dirname, "../views/ErrorPage.hbs"),
        {
            errorMessage: "You have to go back to home page"
        }

    )
})
// starting the server at port 3000
app.listen(3000, () => console.log("Sever is running"));

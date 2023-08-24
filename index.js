const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;

// File path creation
const staticPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(express.static(staticPath));

//setup view engine and views path for hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

const address = process.argv[2];

// if (!address) {
//   console.log("Please enter address in command line");
// } else {
//   geocode(address, (err, data) => {
//     if (err) {
//       return console.log(err);
//     }
//     forecast(data, (err, response) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log(response);
//     });
//   });
// }

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aditya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Aditya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aditya",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({ error: "Please Enter address." });
  }
  geocode(address, (error, data) => {
    if (error) {
      return res.send({ error });
    }
    forecast(data, (error, response) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: data.location,
        forecast: {
          temparature: response.temp_c,
          wind_kph: response.wind_kph,
          humidity: response.humidity,
          feelslike: response.feelslike_c,
        },
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aditya",
  });
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

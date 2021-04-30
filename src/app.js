const path = require("path");
const express = require("express");
const hbs = require("hbs");
const foreCast = require("./utils/forecast");
const geoCode = require("./utils/geocode");
const app = express();

// Define paths for Express config
const publicPathDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPathDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "index",
    name: "Sandy",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Sandy",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Sandy",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(req.query.address, (error, { lati, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    foreCast(long, lati, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      return res.send({
        forcast: "It is snowing",
        body: forecastData,
      });
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.end({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Help artical not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "404 Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

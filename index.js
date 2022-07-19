const express = require("express");
const cors = require("cors");

const app = express();

//Config json response
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  // Pass to next layer of middleware
  next();
});

//Routes
const UserRoutes = require("./routes/UserRoutes");
const ListRoutes = require("./routes/ListRoutes");
// const StandardListRoutes = require('./routes/StandardListRoutes')

app.get("/", (req, res) => {
  return res.json({ message: "Serves is up!" });
});

app.use("/user", UserRoutes);
app.use("/list", ListRoutes);
// app.use('/standardlist',StandardListRoutes)

var port = process.env.PORT || 8080;
app.listen(port);

const express = require("express");
const cors = require("cors");
var _ = require('underscore');

const app = express();

//Config json response
app.use(express.json());

function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}

app.configure(function () {
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(allowCrossDomain);
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

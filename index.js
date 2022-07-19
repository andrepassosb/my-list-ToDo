const express = require("express");
const cors = require("cors");

const app = express();

//Config json response
app.use(express.json());

// Add headers before the routes are defined
app.use(cors());

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

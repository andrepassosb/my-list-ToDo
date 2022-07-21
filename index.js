const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

//Config json response
app.use(express.json());

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

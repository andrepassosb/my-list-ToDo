const express = require("express");
const cors = require("cors");

const app = express();

//Config json response
app.use(express.json());

//Solve CORS
// var allowedOrigins = [
//   "http://localhost:3000",
//   "http://naya-caju-list.vercel.app",
// ];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         var msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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

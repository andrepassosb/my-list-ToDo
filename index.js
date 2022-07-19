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

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://naya-caju-list.vercel.app"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

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

const express = require("express")
const cors = require('cors')

const app = express()

//Config json response
app.use(express.json())

//Solve CORS
// app.use(cors({ credentials: true, origin:'http://localhost:3000'}))


//Routes
const UserRoutes = require('./routes/UserRoutes')
const ListRoutes = require('./routes/ListRoutes')
// const StandardListRoutes = require('./routes/StandardListRoutes')

app.get('/',(req, res) =>{
    return res.json({message:"Serves is up!"})
})

app.use('/user',UserRoutes)
app.use('/list',ListRoutes)
// app.use('/standardlist',StandardListRoutes)

app.listen(8000)

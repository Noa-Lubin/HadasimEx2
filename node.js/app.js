var express = require('express')

const clientsRouter = require("./routes/clients")
const vaccinationsRouter = require("./routes/vaccinations")
const positivesRouter = require("./routes/positives")

const bodyParser=require('body-parser')
const cors= require('cors')



var app = express()
app.use(cors({methods:"*",origin:"*"}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/client", clientsRouter)
app.use("/vaccination", vaccinationsRouter)
app.use("/positive", positivesRouter)

app.listen(3030,()=>{console.log("sucsssed")})


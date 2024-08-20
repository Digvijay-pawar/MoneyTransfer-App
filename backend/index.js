const express = require("express");
const User = require("./db/db.js")
const mainRouter = require("./routes/index")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", mainRouter)


const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Localhost running on " + PORT)
})


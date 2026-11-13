require("dotenv").config()
require("node:dns").setServers(["8.8.8.8", "8.8.4.4"])

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" })
})

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})
.catch((err) => {
    console.log(`Mongoose Connection Failed: ${err.message}`)
})

module.exports = app
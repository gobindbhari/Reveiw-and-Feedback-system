const express = require('express')
const database = require('./config/connections')
const cors = require('cors')
const postRouter = require('./routes/postRoute')
const feedbackRouter = require('./routes/feedbackRoute')
const cron = require("node-cron")
const https = require("https")
require('dotenv').config()


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/post',postRouter)

app.use('/feedback',feedbackRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const express = require("express")
const bodyParser = require("body-parser")
const config = require("config")
const axios = require("axios")
const {convertToCsv} = require("./export")

const app = express()

app.use(bodyParser.json({limit: "10mb"}))

app.get("/investments/:id", (req, res) => {
  const {id} = req.params
  axios.get(`${config.investmentsServiceUrl}/investments/${id}`)
    .then(investments => res.send(investments))
    .catch(error => {
      console.error(error)
      res.send(500)
    })
})

app.get("/investments/export/csv", async (req, res) => {
  res.json(await convertToCsv())
})

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
})

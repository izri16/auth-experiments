const express = require('express')
const path = require('path')
const app = express()

const port = 3002

app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.listen(port, () => {
  console.log(`CSRF attacker listening at http://localhost:${port}`)
})

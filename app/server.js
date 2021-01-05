const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')

/* const cookie = require('cookie')
const cors = require('cors')
const crypto = require('crypto') */

const app = express()
const port = 3000

// 1. Default, CORS is disabled

// 2. All CORS enabled
/* app.use(cors()) */

// 3. Specific domain enable
/* app.use(
  cors({
    origin: 'http://localhost:3002',
    credentials: true,
  })
) */

app.use(bodyParser.json())

/* const requireJson = (req, res, next) => {
  if (!req.is('application/json')) {
    console.log('Not a JSON request!')
    res.status(400)
    res.send('Requires application/json')
  } else {
    next()
  }
} */

app.use(express.static(__dirname + '/static'))

app.use(
  session({
    secret: 'load-me-from-ENV',
    cookie: {httpOnly: true},
    secure: false, // Set to "true" in production!
  })
)

app.post('/login', (req, res) => {
  // Set CSRF token
  /* const csrfToken = crypto.randomBytes(20).toString('hex')
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('csrfToken', csrfToken, {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })
  )
  req.session.csrfToken = csrfToken */

  req.session.userId = 1
  res.end()
})

app.get('/data', (req, res) => {
  console.log('Reached: GET/data')

  if (req.session.userId === 1) {
    // Check CSRF token
    /* if (req.session.csrfToken !== req.headers['csrf-token']) {
      console.log('CSRF protection worked')
      return res.sendStatus(403)
    } */

    console.log('Sending secret data!')
    return res.json({data: 'Secret data!'})
  }
  return res.sendStatus(403)
})

// Note: you should not design the endpoint like that :)
// TODO: showcase with DELETE
app.post('/deleteAccount', (req, res) => {
  console.log('Reached: POST/deleteAccount')

  if (req.session.userId === 1) {
    // Check CSRF token
    /* if (req.session.csrfToken !== req.headers['csrf-token']) {
      console.log('CSRF protection worked')
      return res.sendStatus(403)
    } */
    console.log('Deleted account!')
    return res.json({})
  }
  return res.sendStatus(403)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

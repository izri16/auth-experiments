const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

/* const cors = require('cors')
const crypto = require('crypto') */

const app = express()
const port = 3000

// 1. Default, CORS is disabled

// 2. All CORS enabled
/* app.use(cors()) */

// 3. Specific cors
// https://www.npmjs.com/package/cors
/* app.use(
  cors({
    // Access-Control-Allow-Origin
    origin: 'http://localhost:3002',

    // Those options have effect only when "preflight" is fired
    // Access-Control-Allow-Credentials
    credentials: true,
    // Access-Control-Allow-Methods
    // methods: [],
  })
) */

app.use(bodyParser.json())
app.use(cookieParser())

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

// Uses cookie-based authentication
app.use(
  session({
    secret: 'load-me-from-ENV',
    saveUninitialized: false,
    resave: false,
    cookie: {httpOnly: true, secure: false},
  })
)

app.post('/login', (req, res) => {
  // Set CSRF token
  /* const csrfToken = crypto.randomBytes(20).toString('hex')
  res.cookie('csrfToken', csrfToken, {
    maxAge: 60 * 60 * 24 * 7, // 1 week,
  })
  req.session.csrfToken = csrfToken */

  req.session.userId = 1
  res.end()
})

app.get('/data', (req, res) => {
  console.log('Reached: GET/data', req.cookies)

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
/* app.post('/deleteAccount', (req, res) => {
  console.log('Reached: POST/deleteAccount', req.cookies)

  if (req.session.userId === 1) {
    // Check CSRF token
    // if (req.session.csrfToken !== req.headers['csrf-token']) {
    //  console.log('CSRF protection worked')
    //  return res.sendStatus(403)
    // }
    console.log('Deleted account!')
    return res.json({})
  }
  return res.sendStatus(403)
}) */

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

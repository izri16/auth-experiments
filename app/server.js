const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const multer = require('multer')
// const cors = require('cors')
// const crypto = require('crypto')

const app = express()
const port = 3000

// 1. Default, CORS is disabled

// 2. All CORS enabled
// app.use(cors())

// 3. Specific cors
// https://www.npmjs.com/package/cors
// app.use(
//   cors({
//     // Access-Control-Allow-Origin
//     origin: 'http://localhost:3002',

//     // Those options have effect only when "preflight" is fired
//     // Access-Control-Allow-Credentials
//     credentials: true,
//     // Access-Control-Allow-Methods
//     // methods: [],
//   })
// )

// When you need to allow multiple origins
// app.use((req, res, next) => {
//   // this could be some white-list, not it allows ALL origins!!!
//   res.header('Access-Control-Allow-Origin', req.headers.origin)
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   if (req.method === 'OPTIONS') {
//     res.send(200)
//     return
//   }
//   next()
// })

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// const requireJson = (req, res, next) => {
//   if (!req.is('application/json')) {
//     console.log('Not a JSON request!')
//     res.status(400)
//     res.json('Requires application/json')
//   } else {
//     next()
//   }
// }

// const requireCsrfHeader = (req, res, next) => {
//   if (!req.headers['x-csrf']) {
//     console.log('Not a x-csrf header!')
//     res.status(400)
//     res.json('Requires x-csrf header')
//   } else {
//     next()
//   }
// }

app.use(express.static(__dirname + '/static'))

// Uses cookie-based authentication
app.use(
  session({
    secret: 'load-me-from-ENV',
    saveUninitialized: false,
    resave: false,
    // use "secure" true in production
    cookie: {httpOnly: true, secure: false},
  })
)

app.post('/login', (req, res) => {
  // Set CSRF token
  // const csrfToken = crypto.randomBytes(20).toString('hex')
  // res.cookie('csrfToken', csrfToken)
  console.log('Login ...')
  req.session.userId = 1
  res.end()
})

app.get('/data', (req, res) => {
  if (req.session.userId === 1) {
    // Check CSRF token
    // if (req.cookies.csrfToken !== req.headers['csrf-token']) {
    //   console.log('CSRF protection worked')
    //   res.status(403)
    //   return res.json('Incorrect CSRF token')
    // }
    return res.json({data: 'Secret data!'})
  }
  return res.sendStatus(403)
})

// Note: you should not design the endpoint like that :)
app.post('/deleteAccount', (req, res) => {
  console.log('Reached: POST/deleteAccount', req.cookies)

  if (req.session.userId === 1) {
    // Check CSRF token
    // if (req.cookies.csrfToken !== req.headers['csrf-token']) {
    //   console.log('CSRF protection worked')
    //   res.status(403)
    //   return res.json('Incorrect CSRF token')
    // }
    console.log('Deleted account!')
    return res.json({})
  }
  return res.sendStatus(403)
})

/* app.post('/sendMoney', (req, res) => {
  console.log('Reached: POST/sendMoney', req.cookies)

  if (req.session.userId === 1) {
    // Check CSRF token
    // if (req.cookies.csrfToken !== req.body.csrfToken) {
    //   console.log('CSRF protection worked')
    //   res.status(403)
    //   return res.json('Incorrect CSRF token')
    // }

    console.log('Money sent!')
    return res.json(
      `Money sent successfully: recipient:${req.body.recipient} amount:${req.body.amount}`
    )
  }
  return res.sendStatus(403)
}) */

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname)
//   },
// })
// const upload = multer({storage: storage}).single('file')

// app.post('/file', requireCsrfHeader, (req, res) => {
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err)
//     } else if (err) {
//       return res.status(500).json(err)
//     }
//     return res.status(200).send(req.file)
//   })
// })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

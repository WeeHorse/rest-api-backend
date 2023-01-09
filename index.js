const express = require("express");
const server = express();
server.use(express.json())
const db = require("./modules/db.js")('./database/rest-api-backend.db')
const port = 3333
const host = `http://localhost:${port}`

// sessions
let cookieParser = require('cookie-parser')
server.use(cookieParser())
let session = require('express-session')
server.use( session( {
  secret: 'keyboard cat jksfj<khsdka',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true with https
    httpOnly: true
  }
}))

// set to true to bypass 2FA verification (do this in dev only)
const bypass2FA = true
// set bypass 2FA verification 
server.use(function(req,res,next){req.bypassVerification = bypass2FA; next()})


// start
server.listen(port,() => {
  console.log(host)
  console.log('server running on port ' + port)
})

// custom REST API routes
require('./api-description.js')(host, server)
require('./routes/users.js')(server, db)
require('./routes/login.js')(server, db)

// generic REST API one-to-one table mappings
require('./routes/generic-routes.js')(server, db)

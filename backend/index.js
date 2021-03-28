// Load the .env file
require('dotenv').config()

// Load constants from .env file
const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

// Load express and create a new app
const express = require('express');
const app = express();
app.use(express.json())

// Load external libraries
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fs = require('fs');
const JWT = require('jsonwebtoken')
const logger = require('morgan')

// Load the middleware to check our access_token
const checkAccess = require('./middlewares/checkAccessTokenCookie.js')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(logger('common', { stream: fs.createWriteStream('./logs/access.log') }))

// Uncomment the following line to activate the checkAccessTokenMiddleware
// app.use(checkAccess)

// Load the routes
const routes = require('./routes/api/v1/routes.js')(app)

// Start the app
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

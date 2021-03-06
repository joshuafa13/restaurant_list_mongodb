// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const PORT = process.env.PORT

const routes = require('./routes')

const app = express()
require('./config/mongoose')

// setup express handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
}))

app.use(express.static('public'))
app.use(methodOverride('_method'))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})
// setup router
app.use(routes)

//listen
app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`)
})

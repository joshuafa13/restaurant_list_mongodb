// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const routes = require('./routes')
require('./config/mongoose')

// setup express handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
	secret: 'ThisIsMySecret',
	resave: false,
	saveUninitialized: true,
}))

app.use(express.static('public'))
app.use(methodOverride('_method'))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
usePassport(app)
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	next()
})
// setup router
app.use(routes)

//listen
app.listen(3000, () => {
	console.log(`Listening on http://localhost:3000`)
})

// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const routes = require('./routes')

// setup mongoose
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
// setup mongoose connection
const db = mongoose.connection
// connection error
db.on('error', () => {
	console.log('mongodb error')
})
// connection success
db.once('open', () => {
	console.log('mongodb connected')
})

// setup express handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
// body parser
app.use(bodyParser.urlencoded({ extended: true }))

// setup router
app.use(routes)

//listen
app.listen(3000, () => {
	console.log(`Listening on http://localhost:3000`)
})

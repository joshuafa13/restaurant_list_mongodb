// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

// variables
const port = 3000

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

// setup router
app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

//listen
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})

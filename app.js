// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const bodyParser = require('body-parser')

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

app.use(express.static('public'))

// body parser
app.use(bodyParser.urlencoded({ extended: true }))
// setup router
app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})
// new page router
app.get('/restaurants/new', (req, res) => {
	res.render('new')
})
// create new
app.post('/restaurants', (req, res) => {
	const data = req.body
	console.log(data)
	return Restaurant.create({
		name: data.name,
		name_en: data.name_en,
		category: data.category,
		image: data.imageURL,
		location: data.location,
		phone: data.phone,
		google_map: data.googleMapURL,
		rating: data.rating,
		description: data.description,
	})
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})
// set detail router
app.get('/restaurants/:id', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('detail', { restaurant }))
		.catch(error => console.log(Error))
})
// set edit router
app.get('/restaurants/:id/edit', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})
// set edit post router
app.post('/restaurants/:id/edit', (req, res) => {
	const id = req.params.id
	const data = req.body
	return Restaurant.findById(id)
		.then(restaurant => {
			restaurant.name = data.name
			restaurant.name_en = data.name_en
			restaurant.category = data.category
			restaurant.image = data.image
			restaurant.location = data.location
			restaurant.phone = data.phone
			restaurant.google_map = data.google_map
			restaurant.rating = data.rating
			restaurant.description = data.description
			return restaurant.save()
		})
		.then(() => res.redirect(`/restaurants/${id}`))
		.catch(error => console.log(error))
})
// setup delete router
app.post('/restaurants/:id/delete', (req, res) => {
	const id = req.params.id
	return Restaurant.findById(id)
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

//listen
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})

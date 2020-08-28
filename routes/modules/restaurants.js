const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
	res.render('new')
})
router.post('/', (req, res) => {
	const userId = req.user._id
	const data = req.body
	console.log(data)
	return Restaurant.create({
		name: data.name,
		name_en: data.name_en,
		category: data.category,
		image: data.image,
		location: data.location,
		phone: data.phone,
		google_map: data.google_map,
		rating: data.rating,
		description: data.description,
		userId,
	})
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})
// set edit router
router.get('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findById({ _id, userId })
		.lean()
		.then(restaurant => res.render('detail', { restaurant }))
		.catch(error => console.log(Error))
})
// set edit router
router.get('/:id/edit', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findById({ _id, userId })
		.lean()
		.then(restaurant => res.render('edit', { restaurant }))
		.catch(error => console.log(error))
})
// set edit post router
router.put('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	const data = req.body
	return Restaurant.findById({ _id, userId })
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
		.then(() => res.redirect(`/restaurants/${_id}`))
		.catch(error => console.log(error))
})
// setup delete router
router.delete('/:id', (req, res) => {
	const userId = req.user._id
	const _id = req.params.id
	return Restaurant.findById({ _id, userId })
		.then(restaurant => restaurant.remove())
		.then(() => res.redirect('/'))
		.catch(error => console.log(error))
})

module.exports = router

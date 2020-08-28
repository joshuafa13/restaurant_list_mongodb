const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
	const userId = req.user._id
	Restaurant.find({ userId })
		.lean()
		.sort({ _id: 'asc' })
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

router.get('/search', (req, res) => {
	const keyword = req.query.keyword
	const userId = req.user._id
	Restaurant.find({ name: { $regex: keyword, $options: 'i' }, userId })
		.lean()
		.then(restaurants => res.render('index', { restaurants }))
		.catch(error => console.log(error))
})

module.exports = router

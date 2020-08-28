const mongoose = require('mongoose')

// setup mongoose
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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

module.exports = db

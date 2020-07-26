// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// variables
const port = 3000

// set up express handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// set up router
app.get('/', (req, res) => {
	res.render('index')
})

//listen
app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`)
})

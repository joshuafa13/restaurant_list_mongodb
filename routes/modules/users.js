const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const error = []
  if (!email || !password || !confirmPassword) {
    error.push({ message: 'Please fill in required fields!' })
  }
  if (password !== confirmPassword) {
    error.push({ message: 'Password must match Confirm Password!' })
  }
  if (error.length) {
    return res.render('register', {
      error,
      name,
      email,
      password,
      confirmPassword,
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        error.push({ message: 'User already exist' })
        return res.render('register', {
          error,
          name,
          email,
          password,
          confirmPassword,
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash,
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logged out!')
  res.redirect('/users/login')
})

module.exports = router
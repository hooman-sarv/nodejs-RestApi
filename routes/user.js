const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//const User = require('../models/user')

const userControllers = require('../controllers/user')

const router = express.Router();

router.get('/getUsers' , userControllers.getUsers)

router.post('/signup', userControllers.signup)

router.post('/login' , userControllers.login)

router.post('/logout/:userId', userControllers.logout)

router.put('/:userId', userControllers.updateUserInfo)

router.delete('/:userId', userControllers.deleteUser)

module.exports = router;
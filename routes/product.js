const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/check-auth')

const productControllers = require('../controllers/product')


const router = express.Router();

router.get('/getProduct' , productControllers.getProduct)


router.post('/addProduct' , checkAuth, productControllers.addProduct )

module.exports = router;
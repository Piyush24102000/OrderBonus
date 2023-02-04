const express = require('express')
const router = express.Router()
const {createCustomer} = require('../controller/customer')
const {createOrder} = require('../controller/order')

/* ----Customer route----- */
router.post('/createCustomer',createCustomer)

/* -----Order route----- */
router.post('/createOrder',createOrder)
module.exports =  router 
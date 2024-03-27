const path = require('path');

const express = require('express');

const booking_appointment = require('../controllers/booking_appointment');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);


// /admin/add-product => POST
router.post('/user/add-user', booking_appointment.postAddUser);


module.exports = router;

const path = require('path');

const express = require('express');

const booking_appointment = require('../controllers/booking_appointment');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getAddProduct);


// /admin/add-product => POST
router.post('/add-user', booking_appointment.postAddUser);


router.get('/get-users',booking_appointment.getusers);

router.delete('/delete-user/:id',booking_appointment.deleteUser);


module.exports = router;

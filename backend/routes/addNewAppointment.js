const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

router.post('/', function (req, res) {

  let uploadAppoinment = {
    "appointment_date": req.body.appointment_date,
    "appointment_time": req.body.appointment_time,
    "doctor_id": req.body.doctor_id,
    "patient_name": req.body.patient_name,
    "patient_email": req.body.patient_email,
    "patient_phone" : req.body.patient_phone,
    "appointment_status": req.body.appointment_status
  }

  let responseObject = [];
  Appointment.create(uploadAppoinment).then(result => {
      if (result) {
        res.status(201).send({
          status: true,
          result: 'Record Added Successfully!' 
        });
      } else {
        res.status(500).send({
          status: true,
          result: 'Error occurred, Something went wrong!'
        });
      }
  }).catch(e => console.log(e));

});

module.exports = router;

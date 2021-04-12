const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

router.post('/', function (req, res) {
  let appointmentID = req.body.appointment_id;
  let responseObject = [];

  const where = {
    appointment_id : appointmentID
  }
  let updateData = {
    "appointment_status": req.body.appointment_status
  }
  Appointment.update(updateData, { where: [where] }).then(result => {
    if(result == 1) {
      responseObject = ['updated Successfully'];
    } else {
      responseObject = ['Error occurred, Something went wrong!'];
    }
    res.json({
      result: responseObject
    });
  }).catch(e => console.log(e));

});

module.exports = router;

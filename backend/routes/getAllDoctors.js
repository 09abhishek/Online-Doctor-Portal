const express = require('express');
const router = express.Router();
const Doctors = require('../models/doctor')

router.get('/', function (req, res) {
  Doctors.findAll().then(result => {
    let responseObject = [];
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      responseObject.push(result[i].dataValues);
    }
    res.status(200).send({
      status:true,
      result: responseObject
    });
  }).catch(e => console.log(e));
});

module.exports = router;

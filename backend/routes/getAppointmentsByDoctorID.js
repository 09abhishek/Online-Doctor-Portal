const express = require('express');
const router = express.Router();
const Appoinments = require('../models/appointment')



router.get('/', function (req, res)  {
 const doctorID = req.body.doctor_id;
  let responseObject = [];
  Appoinments.findAll({where: {doctor_id: doctorID}}).then(result => {
     for (let i = 0; i < result.length; i++) {
       console.log(result[i].dataValues);
       responseObject.push(result[i].dataValues);
     }
     res.status(200).send({
       status:true,
       result: responseObject
     });
  }).catch(e => console.log(e));


});


module.exports = router;

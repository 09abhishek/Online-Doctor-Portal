const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/', function (req, res) {
  let doctor_id = req.body.doctor_id;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date
  if (doctor_id) {

    console.log(start_date, end_date );

    Appointment.findAll({
      where: {
        [Op.and]: [
          { doctor_id: doctor_id },
          { appointment_date: {[Op.between]: [new Date(start_date), new Date(end_date)]}}
        ],
      },
      order: [
        ['appointment_date', 'ASC']
  ]

    }).then((result) => {
      console.log(result);
      if (res) {
        let responseObject = [];
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].dataValues);
          responseObject.push(result[i].dataValues);
        }
        res.status(200).send({
          status: true,
          result: responseObject
        });
      } else {
        responseObject = [];
        res.status(200).send({
          status: true,
          result: responseObject
        });
      }
    }).catch(e => console.log(e));
  } else {
    res.status(200).send({
      status: true,
      result: []
    });
  }
});

// Post.findAll({
//   where: {
//     [Op.or]: [
//       sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7),
//       {
//         content: {
//           [Op.like]: 'Hello%'
//         }
//       },



//       {
//         [Op.and]: [
//           { status: 'draft' },

//           sequelize.where(sequelize.fn('char_length', sequelize.col('content')), {
//             [Op.gt]: 10
//           })
//         ]
//       }
//     ]
//   }
// });

module.exports = router;

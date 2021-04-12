const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', function (req, res) {
  const email = req.body.email.toLowerCase();
  const pwd = req.body.password;

  User.findOne({where: {email: email, password: pwd}}).then(result => {
    if (result) {
      delete result.dataValues.user_pwd;
      res.status(200).send({
        status:true,
        result: result
      });
    } else {
      res.status(200).send({
        status:false,
        result: "User not found or Invalid Credentials!"
      });
    }

  }).catch((e) => {
    console.log(e);
  })

});


module.exports = router;

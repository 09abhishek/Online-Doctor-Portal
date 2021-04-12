const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const db = require('./backend/database');

const login = require('./backend/routes/login');

const getAlldoctors = require('./backend/routes/getAllDoctors');
const getAppointmentsByDoctorID = require('./backend/routes/getAppointmentsByDoctorID');
const editAppointmentStatus = require('./backend/routes/editAppointmentStatus');
const addNewAppointment = require('./backend/routes/addNewAppointment');
const searchAppointments = require('./backend/routes/searchAppointments');


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


db.authenticate().then(res => console.log('Connected to DB!!')).catch(err => console.log('error', err));



app.use('/login', login);

app.use('/getAllDoctors', getAlldoctors);

app.use('/getDoctorDetailsByID', getAlldoctors);

app.use('/getAppointmentsByDoctorID', searchAppointments);

app.use('/editAppointmentStatus', editAppointmentStatus);

app.use('/addNewAppointment', addNewAppointment);


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/backend','views', '404.html'));
});

// need to add try catch block in every DB operation

app.get('/', function (req, res) {
  res.send('login First!');
})

let server = app.listen(8081,   "192.168.0.127", function () {
  let host = server.address().address
  let port = server.address().port

  console.log("app listening at http://%s:%s", host, port)
})

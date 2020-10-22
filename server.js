const express = require('express');
const app = express();
const cors = require('cors');

var corsOption = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}

app.use(cors(corsOption));

app.get('/', function (req, res) {
  // res.send('Backend is running! URL to Frontend: ' + process.env.FRONTEND_URL);
  res.redirect(process.env.FRONTEND_URL);
});

const keycloak = require('./config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

app.use(require('body-parser').json());

var dbController = require('./controller/db-controller.js');
app.use('/db', dbController);


app.listen(3000);
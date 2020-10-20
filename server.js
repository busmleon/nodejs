var express = require('express');
var app = express();

const keycloak = require('./config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

var dbController = require('./controller/db-controller.js');
app.use('/db', dbController);

app.get('/', function (req, res) {
  res.send("Server is up!");
});

app.listen(3000);
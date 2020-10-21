var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();

// const uri = 'mongodb://root:root@localhost';
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var collection;

client.connect().then(() => {
  collection = client.db(process.env.MONGO_INITDB_DATABASE).collection('users');
  console.log('Connected to DB');
}).catch(_ => {
  console.log('Connection to DB failed!');
});

router.get('/user', keycloak.protect(['user', 'admin']), function (req, res) {
  try {
    collection.find().toArray().then(users => {
      res.send(users);
      res.sendStatus(200);
    })
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/admin', keycloak.protect('admin'), function (req, res) {
  res.send("Hello Admin");
  res.sendStatus(200);
  //TODO: admin only access
});
module.exports = router;
import { Router } from 'express'
import { MongoClient } from 'mongodb'
var router = Router()
const keycloak = require('../config/keycloak-config.js').getKeycloak()

const uri = process.env.MONGO_CONNECTION_STRING
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
var database
var collection

client.connect().then(() => {
  database = client.db(process.env.MONGO_INITDB_DATABASE)
  console.log('Connected to DB')
}).catch(_ => {
  console.log('Connection to DB failed!')
})

router.get('/user', keycloak.protect(['user', 'admin']), (_req, res) => {
  try {
    collection = database.collection('users')
    collection.find().toArray().then(users => {
      res.send(users)
    })
  } catch (err) {
    res.json({ message: err })
  }
})

router.get('/admin', keycloak.protect('admin'), (_req, res) => {
  try {
    collection = database.collection('admins')
    collection.find().toArray().then(admins => {
      res.send(admins)
    })
  } catch (err) {
    res.json({ message: err })
  }
})
export default router
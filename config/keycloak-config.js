const session = require('express-session')
const Keycloak = require('keycloak-connect')

let _keycloak

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_BACKEND_CLIENT,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
}

const initKeycloak = () => {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!")
    return _keycloak
  }
  else {
    console.log("Initializing Keycloak...")
    var memoryStore = new session.MemoryStore()
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    return _keycloak
  }
}

const getKeycloak = () => {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please call init first.')
  }
  return _keycloak
}

exports.initKeycloak = initKeycloak
exports.getKeycloak = getKeycloak
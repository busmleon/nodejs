import { MemoryStore } from 'express-session'
import Keycloak from 'keycloak-connect'

let _keycloak

const keycloakConfig = {
  clientId: process.env.KEYCLOAK_BACKEND_CLIENT,
  bearerOnly: true,
  serverUrl: process.env.KEYCLOAK_URL,
  realm: process.env.KEYCLOAK_REALM,
}

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!")
    return _keycloak
  }
  else {
    console.log("Initializing Keycloak...")
    var memoryStore = new MemoryStore()
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig)
    return _keycloak
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please call init first.')
  }
  return _keycloak
}

export default {
  initKeycloak,
  getKeycloak
}
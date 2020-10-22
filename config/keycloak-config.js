var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
  // clientId: 'NodeJS',
  clientId: process.env.KEYCLOAK_BACKEND_CLIENT,
  bearerOnly: true,
  // serverUrl: 'http://localhost:8080/auth',
  serverUrl: process.env.KEYCLOAK_URL,
  // realm: 'APP_REALM',
  realm: process.env.KEYCLOAK_REALM,
  credentials: {
    // secret: '750bf571-c29c-417e-9757-0d1f4d11e37e'
    secret: process.env.KEYCLOAK_BACKEND_CLIENT_SECRET
  }
};

function initKeycloak() {
  if (_keycloak) {
    console.warn("Trying to init Keycloak again!");
    return _keycloak;
  }
  else {
    console.log("Initializing Keycloak...");
    var memoryStore = new session.MemoryStore();
    _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
    return _keycloak;
  }
}

function getKeycloak() {
  if (!_keycloak) {
    console.error('Keycloak has not been initialized. Please call init first.');
  }
  return _keycloak;
}

module.exports = {
  initKeycloak,
  getKeycloak
};
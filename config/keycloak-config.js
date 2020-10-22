var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
  clientId: 'NodeJS',
  // clientId: process.env.KEYCLOAK_BACKEND_CLIENT,
  bearerOnly: true,
  serverUrl: 'https://admin.busmleon.de/auth',
  // serverUrl: process.env.KEYCLOAK_URL,
  realm: 'APP_REALM',
  // realm: process.env.KEYCLOAK_REALM,
  credentials: {
    secret: 'f84271bb-afaf-43a8-8f1e-79f10b527004'
    // secret: process.env.KEYCLOAK_BACKEND_CLIENT_SECRET //TODO direkt mit richtigen SECRET aufsetzen??
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
import auth0 from 'auth0-js'

import hAuthStorage from './src/AuthStorage'

export default {
  name: 'hAuth',
  storage: hAuthStorage,
  auth0Config: {
    // Example/format:
    domain: '',
    clientId: '',
    callbackUris: {
      'environment': 'value'
    }
  },
  auth0: {
    webAuth: null
  },
  install(Vue, setup) {
    this.auth0Config = setup.configuration;
    console.log('install', this.auth0Config);
    this.auth0.webAuth = this.getNewWebAuth();
    Vue.prototype.$hAuth = this;
    Vue.hAuth = this;
    console.log('install2', this.auth0.webAuth);
  },
  getNewWebAuth() {
    return new auth0.WebAuth({
      domain: this.auth0Config.domain,
      clientID: this.auth0Config.clientId,
      redirectUri: this.auth0Config.callbackUris['development'],
      audience: `https://${this.auth0Config.domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid email profile'
    })
  },
  login() {
    this.auth0.webAuth.authorize()
  },
  handleAuthentication(callbackFunction) {
    let callback = callbackFunction;
    this.auth0.webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
      else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
      callback(err, authResult);
    });
  },
  setSession(authResult) {
    authResult.expiresAt = this.getExpiresAtValue(authResult.expiresIn);
    this.storage.setAuthResult(authResult);
  },

  getExpiresAtValue(expiresIn) {
    return expiresIn * 1000 + new Date().getTime();
  },

  getToken() {
    return this.getAuthResult().idToken;
  },

  getAuthResult() {
    return this.storage.getAuthResult();
  },

  getUserProfile() {
    let payload = this.getAuthResult().idTokenPayload;
    let userProfile = {
      email: payload.email,
      name: payload.name,
      nickname: payload.nickname,
      pictureUrl: payload.picture,
      idAuth0: payload.sub,
      updatedAt: payload.updated_at,
      lastName: payload.family_name,
      firstName: payload.given_name
    }
    return userProfile;
  },
  logout() {
    this.storage.clearAll();
  },
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let authResult = this.getAuthResult();
    return (authResult) && (new Date().getTime() < authResult.expiresAt);
  }
}

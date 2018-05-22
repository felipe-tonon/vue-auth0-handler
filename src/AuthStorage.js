import VueCookie from 'vue-cookie'

const VAR_NAME_AUTH_RESULT = 'authResult';

export default {
  name: "hAuthStorage",
  components: {
    VueCookie
  },
  /** Auth Result*/
  setAuthResult(authResult) {
    this.setStringifiedJson(VAR_NAME_AUTH_RESULT, authResult);
  },
  getAuthResult() {
    return this.getStringifiedJson(VAR_NAME_AUTH_RESULT);
  },
  clearAuthResult() {
    VueCookie.delete(VAR_NAME_AUTH_RESULT);
  },
  /** all */
  setStringifiedJson(cookieName, object) {
    let jsonString = JSON.stringify(object)
    VueCookie.set(cookieName, jsonString);
  },
  getStringifiedJson(cookieName) {
    let jsonString = VueCookie.get(cookieName);
    return JSON.parse(jsonString);
  },
  clearAll() {
    this.clearAuthResult();
  }


}

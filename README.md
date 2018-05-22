# vue-auth0-handler
Handles login/logout and authentication callback from Auth0 in Vue2

### Quick Start

#### Requirements
    
    You need your Auth0 configuration from http://auth0.com

#### Configuration   
   
```

// define the configuration:
const authConfig = {
  clientId: '[your-auth0-ID]',
  domain: '[your-auth0-domain].auth0.com',
  callbackUris: {
    'development': 'http://development.your-application-url.com',
    'production': http://your-application-url.com'
  }
}

// initiate as a Vue plugin:
Vue.use(hAuth, {configuration : authConfig});

// add to your App.vue
<h-callback redirectTo="/"></h-callback>

```

### Options

Once a successful login happens, you can have your hCallback component to perform a redirection OR to fire and event. 
```
    // redirecting:
    <h-callback redirectTo="your_after-login_page/"></h-callback>
```
```
    // firing an event:
    <h-callback loginEventName="logged_in" v-on:logged_in="testLoginEvent"></h-callback>
```

### $hAuth api methods

#### login()
```
    // redirects to Auth0's login page
    this.$hAuth.login();
```
#### logout()
```    
    // clears any authentication information 
    this.$hAuth.logout();
```
#### isAuthenticated()
```
    // returns a Boolean
    this.$hAuth.isAuthenticated()
```
#### getToken()
```    
    // returns JWT token
    this.$hAuth.getToken();
```
#### getUserProfile()
```    
    this.$hAuth.getUserProfile();
    // returns the User's info in JSON with the following format:
      {
           email: '',
           name: '',
           nickname: '',
           pictureUrl: '',
           idAuth0: '',
           updatedAt: '',
           lastName: '',
           firstName: ''
      }
```

# vue-auth0-handler
Handles login/logout and authentication callback from Auth0 in Vue2

### Quick Start

#### Requirements
    
    You need your Auth0 configuration from http://auth0.com

#### Installation

```
    > npm i vue-auth0-handler
``` 

#### Configuration   
   
```javascript

// define the configuration:
const authConfig = {
  clientId: '[your-auth0-ID]',
  domain: '[your-auth0-domain].auth0.com',
  callbackUris: {
    'development': 'http://development.your-application-url.com',
    'production': 'http://your-application-url.com'
  }
}

// initiate as a Vue plugin:
Vue.use(hAuth, {configuration : authConfig});
```

#####    Add to your App.vue: 


    Inside <template> tag:    
    
```html
    <h-callback redirectTo="/"></h-callback>
```

## 
    Insite <script> tag:    
```javascript
    import hCallback from "vue-auth0-handler/Callback.vue";
    export default {
        ...
        components: {
            hCallback
        }
    }
```

### Options

Once a successful login happens, you can have your hCallback component to perform a redirection *OR* to fire an event.
##
Redirecting: 
```html
    
    <h-callback redirectTo="your_after-login_page/"></h-callback>
```
##
Firing an event:
```html
    // firing an event:
    <h-callback loginEventName="logged_in" v-on:logged_in="testLoginEvent"></h-callback>
```

### $hAuth api methods

#### login()
```javascript
    // redirects to Auth0's login page
    this.$hAuth.login();
```
#### logout()
```javascript
    // clears any authentication information 
    this.$hAuth.logout();
```
#### isAuthenticated()
```javascript
    // returns a Boolean
    this.$hAuth.isAuthenticated()
```
#### getToken()
```javascript
    // returns JWT token
    this.$hAuth.getToken();
```
#### getUserProfile()
```javascript
    this.$hAuth.getUserProfile();
    // returns the User's info in JSON with the following format:
    let returnsFormat = {
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

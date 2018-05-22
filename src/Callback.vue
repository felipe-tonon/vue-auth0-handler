<template>
    <div v-if="isCallback" class="modal fade show d-block" tabindex="1"
         role="dialog" aria-labelledby="ticketModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    Loading...
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="!isLoggedIn">
        <button @click="login">Login</button>
    </div>
    <div v-else>
        <!-- logged in! :D -->
    </div>
</template>

<script>
  export default {
    name: 'hCallback',
    props: ['loginEventName', 'redirectTo'],
    mounted() {
      this.setFlags();
      if (this.isCallback) {
        this.$hAuth.handleAuthentication(this.handleCallback);
      }
    },
    methods: {
      setFlags() {
        this.isCallback = this.$route.path.includes('access_token');
        this.isLoggedIn = this.$hAuth.isAuthenticated();
      },
      login() {
        this.$hAuth.login();
      },
      handleCallback(err, authResult) {
        this.isCallback = false;
        if (err) {
          console.log(err)
        } else {
          this.onSuccessHandleCallback(authResult);
        }
      },
      onSuccessHandleCallback(authResult) {
        this.isLoggedIn = true;
        console.log('loginEventName =' + this.loginEventName);
        if (this.loginEventName) {
          this.emmitLoginEvent(this.loginEventName, authResult);
        }
        if (this.redirectTo) {
          this.redirectToHome();
        }
      },
      redirectToHome() {
        this.$router.push(this.redirectTo);
        this.$router.go();
      },
      emmitLoginEvent(eventName, authResult) {
        this.$emit(eventName, {authResult: authResult});
      }
    },
    data() {
      return {
        isCallback: false,
        isLoggedIn: false
      }
    }
  }
</script>

<style>

</style>

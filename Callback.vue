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
        <!-- not logged in! :D -->

    </div>
    <div v-else>
        <!-- logged in! :D -->
    </div>
</template>

<script>
  import hAuthStorage from './src/AuthStorage'

  export default {
    name: 'hCallback',
    props: ['loginEventName'],
    components: {
      hAuthStorage
    },
    data() {
      return {
        isCallback: false,
        isLoggedIn: false
      }
    },
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
        if (this.loginEventName) {
          this.emmitLoginEvent(this.loginEventName, authResult);
        }
        this.redirect();
      },
      redirect() {
        let redirectTo = hAuthStorage.getRedirectUrl()
        if (!redirectTo)
          redirectTo = '/';
        this.$router.push(redirectTo);
        this.$router.go(redirectTo);
      },
      emmitLoginEvent(eventName, authResult) {
        this.$emit(eventName, {authResult: authResult});
      }
    }
  }
</script>

<style>

</style>

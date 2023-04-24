<template>
  <the-header v-if="this.$route.path !== '/'"></the-header>
  <router-view> </router-view>
  <!-- <div class="container">
    <div class="row">
      <div class="col justify-content-between mt-3">
        <router-view> </router-view>
      </div>
    </div>
  </div> -->
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
// import UserProfile from './pages/auth/UserProfile.vue';
import '/node_modules/bootstrap/dist/css/bootstrap.css';
import '/node_modules/bootstrap/dist/js/bootstrap.js';
export default {
  name: 'App',
  components: {
    'the-header': TheHeader,
    // 'user-profile': UserProfile,
  },
  computed: {
    navLink() {
      return this.$route.path;
    },
    isAuthenticated() {
      return this.$store.getters['isAuthenticated'];
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  min-height: 100vh;
  width: 100%;
  background: #2e3658;
}
</style>

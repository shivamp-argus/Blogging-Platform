<template>
  <the-header></the-header>
  <div class="container">
    <div class="row">
      <!-- <user-profile
        class="col-3 mt-3"
        v-if="navLink !== '/profile' && navLink === '/blogs' && isAuthenticated"
      ></user-profile> -->
      <div class="col justify-content-between mt-3">
        <router-view :key="this.$route.params.mode"> </router-view>
      </div>
    </div>
  </div>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
</style>

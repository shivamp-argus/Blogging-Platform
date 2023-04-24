<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary navMain">
    <div class="container">
      <router-link class="navbar-brand navBrand" to="/"
        ><img src="../../../public/assets/images/logo.png" alt="#"
      /></router-link>
      <!-- <img src="../../../public/assets/images/logo.png" alt="Blogger"
      /> -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navMenu" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="{ path: '/blogs', query: { page: 1 } }"
              class="nav-link"
              aria-current="page"
              >Blogs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/blogs/create" class="nav-link"
              >Create Blog</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item d-flex">
            <router-link to="/profile" class="nav-link" v-if="isLoggedIn"
              >Profile</router-link
            >
            <router-link
              :to="{
                name: 'auth',
                params: { mode: 'signup' },
              }"
              class="nav-link"
              v-else
              >Sign-Up</router-link
            >
            <router-link
              :to="{ name: 'auth', params: { mode: 'login' } }"
              class="nav-link"
              v-if="!isLoggedIn"
              >Login</router-link
            >
            <router-link to="/auth" class="nav-link" v-else @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  // provide: {
  //   mode: 'signup',
  // },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    signup() {
      return 'signup';
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/auth/login');
    },
  },
};
</script>

<style scoped>
.navMain {
  min-height: 100px;
  /* background-color: #02251f; */
}
.navBrand {
  color: #f6f4e6;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  padding-right: 20px;
}
.navMenu {
  position: absolute;
  top: 50%;
  left: 33%;

  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.navMenu a {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  /* width: 150px; */
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.navMenu a:hover,
.navBrand:hover {
  color: #02fee5;
}
</style>

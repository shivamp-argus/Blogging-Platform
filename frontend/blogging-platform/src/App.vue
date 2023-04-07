<template>
  <the-header></the-header>
  <router-view class="mt-3"></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import "/node_modules/bootstrap/dist/css/bootstrap.css";
import "/node_modules/bootstrap/dist/js/bootstrap.js";
export default {
  name: "App",
  components: {
    "the-header": TheHeader,
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style></style>

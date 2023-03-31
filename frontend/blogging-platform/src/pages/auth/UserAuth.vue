<template>
  <form class="container" @submit.prevent="userFormData">
    <div class="mb-3">
      <label for="username" class="form-label">Enter your username</label>
      <input
        type="text"
        class="form-control"
        id="username"
        v-model.trim="username"
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model.trim="email"
      />
      <div id="emailHelp" class="form-text">
        We'll never share your email with anyone else.
      </div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        v-model.trim="password"
      />
    </div>
    <div class="actions">
      <button>{{ submitButtonCaption }}</button>
      <button type="button" @click="switchAuthMode">
        {{ switchModeButton }}
      </button>
    </div>
    <p v-if="!formIsValid">
      Please enter valid email and password with length more than 6 characters
    </p>
  </form>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      mode: "login",
      formIsValid: true,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Sign-Up";
      }
    },
    switchModeButton() {
      if (this.mode === "login") {
        return "Sign-Up";
      } else {
        return "Login";
      }
    },
  },
  methods: {
    async userFormData() {
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "blogs");
        this.$router.replace(redirectUrl);
      } catch (err) {
        console.log(err);
        this.error = err.message || "Failed to authenticate";
      }
    },
  },
};
</script>

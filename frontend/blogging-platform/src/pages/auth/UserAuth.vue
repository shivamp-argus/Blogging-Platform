<template>
  <div class="container">
    <!-- <input type="checkbox" id="check" /> -->
    <div class="login form">
      <header>{{ submitButtonCaption }}</header>
      <form @submit.prevent="userFormData">
        <input
          type="text"
          placeholder="Enter username here"
          v-model.trim="username"
          v-if="mode === 'signup'"
        />
        <input
          type="text"
          placeholder="Enter your email"
          aria-describedby="emailHelp"
          v-model.trim="email"
        />
        <input
          type="password"
          placeholder="Enter your password"
          v-model.trim="password"
        />

        <!-- <input type="submit" class="button" value="{{submitButtonCaption}}" /> -->
        <button type="submit" class="button">{{ submitButtonCaption }}</button>
        <p v-if="!formIsValid">
          Please enter valid email and password with length more than 6
          characters
        </p>
      </form>
      <div class="signup">
        <span class="signup"
          >Don't have an account?
          <!-- <label for="check" @click="switchMode()">Signup</label> -->
          <router-link
            :to="{ name: 'auth', params: { mode: 'signup' } }"
            v-if="this.mode === 'login'"
            >Sign-up</router-link
          >
          <router-link :to="{ name: 'auth', params: { mode: 'login' } }" v-else
            >Login</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
      // mode: this.$route.params.mode,
      formIsValid: true,
      error: null,
    };
  },
  computed: {
    mode() {
      return this.$route.params.mode;
    },
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Sign-Up';
      }
    },
    switchRedirectCaption() {
      if (this.mode === 'login') {
        return 'Sign-Up';
      } else {
        return 'Login';
      }
    },
    switchModeButton() {
      if (this.mode === 'login') {
        return 'Sign-Up';
      } else {
        return 'Login';
      }
    },
  },

  methods: {
    async userFormData() {
      console.log(this.$route.params);
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      const actionPayload = {
        email: this.email,
        password: this.password,
        username: this.username,
      };
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl =
          '/' + (this.$route.query.redirect || 'blogs?page=1');
        console.log(redirectUrl);
        this.$router.replace(redirectUrl);
      } catch (err) {
        console.log(err);
        this.error = err.message || 'Failed to authenticate';
      }
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    // switchMode() {
    //   if (this.$route.params.mode === 'login') {
    //     this.$router.replace({
    //       name: 'auth',
    //       params: { mode: 'signup' },
    //     });
    //     // return (this.$route.params.mode = 'signup');
    //   } else {
    //     this.$router.replace({
    //       name: 'auth',
    //       params: { mode: 'login' },
    //     });
    //   }
    // },
  },
};
</script>

<style scoped>
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

.container {
  position: absolute;

  left: 38%;
  /* transform: translate(-50%, -50%); */
  margin-top: 10%;
  max-width: 430px;
  width: 100%;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}
.container .registration {
  display: none;
}

.container .form {
  padding: 2rem;
}
.form header {
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
}
.form input,
button {
  height: 60px;
  width: 100%;
  padding: 0 15px;
  font-size: 17px;
  margin-bottom: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}
.form input:focus,
button:focus {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}
.form a {
  font-size: 16px;
  color: #614600;
  text-decoration: none;
}
.form a:hover {
  text-decoration: underline;
}
.form input.button,
button.button {
  color: #fff;
  background: #614600;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 1.7rem;
  cursor: pointer;
  transition: 0.4s;
}

.signup {
  font-size: 17px;
  text-align: center;
}
.signup label {
  color: #20a799;
  cursor: pointer;
}
.signup label:hover {
  text-decoration: underline;
}
</style>

export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  async singup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = "http://localhost:4000/user";
    if (mode === "login") {
      url = "http://localhost:4000/user/login";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(response);
      const error = new Error(responseData.message || "Failed to sign-up");
      throw error;
    }
    context.commit("setUser", {
      userId: responseData.user._id,
      token: responseData.token,
    });
  },
  logout(context) {
    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
};

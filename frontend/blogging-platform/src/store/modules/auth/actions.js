export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  async signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },
  async auth(context, payload) {
    const { mode } = payload;
    let url = "http://localhost:4000/user";
    if (mode === "login") {
      url = "http://localhost:4000/user/login";
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
        email: payload.email,
        password: payload.password,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to sign-up");
      throw error;
    }

    localStorage.setItem("userId", responseData.user._id);
    localStorage.setItem("token", responseData.token);

    context.commit("setUser", {
      userId: responseData.user._id,
      token: responseData.token,
    });
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
};

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
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      context.commit("setUser", {
        userId,
        token,
      });
    }
  },
  // setting up user profile
  async loadProfile(context) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:4000/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      const { users, blogs } = responseData;
      let blogList = [];
      for (let blog of blogs) {
        blogList.push({ blogId: blog._id, blogTitle: blog.title });
      }

      context.commit("setProfile", {
        username: users.username,
        email: users.email,
        blogs: blogList,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

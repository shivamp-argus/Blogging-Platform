<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <router-link class="navbar-brand" to="/">Blogger</router-link>
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/blogs" class="nav-link" aria-current="page"
              >Blogs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/blog/create" class="nav-link"
              >Create Blog</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/auth" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/auth" class="nav-link">Sign-up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style></style>

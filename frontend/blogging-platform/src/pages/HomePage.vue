<template>
  <header>
    <!-- header inner -->
    <div class="head_top">
      <div class="header">
        <div class="container-fluid">
          <div class="row">
            <the-header></the-header>
          </div>
        </div>
      </div>

      <section class="banner_main">
        <div class="container">
          <div class="row d_flex">
            <div class="col-xl-8 col-lg-8 col-md-8 col-12-9">
              <div class="text-bg">
                <h1>
                  Blog<br />
                  <span class="white1">Welcome to our blogging platform</span>
                </h1>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters,
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-4 col-12-3">
              <div class="text-img">
                <figure>
                  <img src="../../public/assets/images/box_img.png" alt="#" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </header>
</template>
<script>
import TheHeader from '@/components/layout/TheHeader.vue';
export default {
  components: {
    'the-header': TheHeader,
  },
};
</script>
<style scoped>
.head_top {
  background: url(../../public/assets/images/banner1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.header {
  width: 100%;
  background: transparent;
  padding: 30px 30px;
}

.logo a {
  font-size: 40px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  line-height: 40px;
}

.banner_main {
  padding: 90px 0 190px 0;
}

.text-bg {
  text-align: left;
}

.text-bg h1 {
  color: #02fee5;
  font-size: 75px;
  line-height: 110px;
  font-weight: bold;
}

.text-bg p {
  color: #fff;
  font-size: 17px;
  line-height: 28px;
  padding: 40px 0;
}

.text-bg a {
  font-size: 17px;
  background-color: #fff;
  color: #000;
  padding: 13px 0px;
  width: 100%;
  max-width: 190px;
  text-align: center;
  display: inline-block;
  transition: ease-in all 0.5s;
}

.text-bg a:hover {
  background-color: #02fee5;
  color: #000;
  transition: ease-in all 0.1s;
  border-radius: 26px;
}

.text-img {
  text-align: left;
}

.white1 {
  color: #fff;
}

.titlepage {
  text-align: center;
  padding-bottom: 60px;
}

.titlepage h2 {
  font-size: 40px;
  color: #3e3e3e;
  line-height: 57px;
  font-weight: bold;
  padding: 0;
  padding-bottom: 20px;
}

.d_flex {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>

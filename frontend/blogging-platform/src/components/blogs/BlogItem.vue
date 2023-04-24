<template>
  <router-link :to="blogDetailLink" class="projcard-container">
    <div class="projcard projcard-blue">
      <div class="projcard-innerbox">
        <div class="projcard-textbox">
          <div class="projcard-title">{{ title }}</div>
          <div class="projcard-subtitle">
            This explains the blog in more detail
          </div>
          <div class="projcard-bar"></div>
          <div class="projcard-description">
            {{ body }}
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
// import CommentsList from "./CommentsList.vue";
export default {
  components: {
    // "comments-list": CommentsList,
  },
  props: ['id', 'title', 'body'],
  computed: {
    blogDetailLink() {
      return this.$route.path + '/' + this.id;
    },
  },
  data() {
    return {
      showComments: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
/* Demo Code: */
.projcard-container {
  margin: 50px 0;
}

/* Actual Code: */
.projcard-container,
.projcard-container * {
  box-sizing: border-box;
}
.projcard-container {
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
}
.projcard {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 40px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #ddd;
  font-size: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.projcard:hover {
  box-shadow: 0 34px 32px -33px rgba(0, 0, 0, 0.18);
  transform: translate(0px, -3px);
}
.projcard::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(-70deg, #424242, transparent 50%);
  opacity: 0.07;
}
.projcard:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #424242, transparent 50%);
}
.projcard-innerbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.projcard:nth-child(2n) .projcard-img {
  left: initial;
  right: 0;
}
.projcard:hover .projcard-img {
  transform: scale(1.05) rotate(1deg);
}
.projcard:hover .projcard-bar {
  width: 70px;
}
.projcard-textbox {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 40px;
  width: calc(100% - 470px);
  font-size: 17px;
}
.projcard:nth-child(2n) .projcard-textbox {
  left: initial;
  right: 430px;
}
.projcard-textbox::before,
.projcard-textbox::after {
  content: '';
  position: absolute;
  display: block;
  background: #ff0000bb;
  background: #fff;
  top: -20%;
  left: -55px;
  height: 140%;
  width: 60px;
  transform: rotate(8deg);
}
.projcard:nth-child(2n) .projcard-textbox::before {
  display: none;
}
.projcard-textbox::after {
  display: none;
  left: initial;
  right: -55px;
}
.projcard:nth-child(2n) .projcard-textbox::after {
  display: block;
}
.projcard-textbox * {
  position: relative;
}
.projcard-title {
  font-family: 'Voces', 'Open Sans', arial, sans-serif;
  font-size: 24px;
  color: #2e3658;
}
.projcard-subtitle {
  font-family: 'Voces', 'Open Sans', arial, sans-serif;
  color: #888;
}
.projcard-bar {
  left: -2px;
  width: 50px;
  height: 5px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: #424242;
  transition: width 0.2s ease;
}
.projcard-blue .projcard-bar {
  background-color: #2e3658;
}
.projcard-blue::before {
  background-image: linear-gradient(-70deg, #2e3658, transparent 50%);
}
.projcard-blue:nth-child(2n)::before {
  background-image: linear-gradient(-250deg, #2e3658, transparent 0%);
}

.projcard-description {
  z-index: 10;
  font-size: 15px;
  color: #424242;
  height: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<!-- <router-link :to="blogDetailLink" class="text-decoration-none text-dark">
    <div class="card mb-4">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <h5 class="card-title">Lorem, ipsum dolor sit amet</h5>
        <p class="card-text">
          {{ body }}
        </p>
      </div>
    </div>
  </router-link> -->

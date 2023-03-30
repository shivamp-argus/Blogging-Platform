<template>
  <div class="container">
    <blog-item
      v-for="blog of blogs"
      :key="blog.id"
      :id="blog.id"
      :body="blog.body"
      :title="blog.title"
      class="mt-2"
    ></blog-item>
  </div>
</template>
<script>
import BlogItem from "../../components/blogs/BlogItem.vue";
export default {
  components: {
    "blog-item": BlogItem,
  },
  data() {
    return {
      blogs: [
        {
          id: 1,
          title: "Lorem ipsum dolor sit amet.",
          body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et placeat nesciunt consectetur itaque maxime vero dolor hic quae minima.",
        },
        {
          id: 2,
          title: "Lorem ipsum dolor sit amet.",
          body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et placeat nesciunt consectetur itaque maxime vero dolor hic quae minima.",
        },
        {
          id: 3,
          title: "Lorem ipsum dolor sit amet.",
          body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et placeat nesciunt consectetur itaque maxime vero dolor hic quae minima.",
        },
        {
          id: 4,
          title: "Lorem ipsum dolor sit amet.",
          body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora et placeat nesciunt consectetur itaque maxime vero dolor hic quae minima.",
        },
      ],
    };
  },
};
</script>
<style></style>

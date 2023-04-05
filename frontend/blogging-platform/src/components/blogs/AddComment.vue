<template>
  <slot></slot>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Comment</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addComment">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Comment</label>
              <input
                type="text"
                class="form-control"
                id="commentText"
                v-model.trim="text"
              />
              <p v-if="!formIsValid">Please enter comment</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Add comment</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: "",
      formIsValid: true,
    };
  },

  methods: {
    async addComment() {
      if (this.text.length <= 0) {
        this.formIsValid = false;
        console.log(this.formIsValid);
        return;
      }
      try {
        const actionPayload = {
          blogId: this.$route.params.id,
          commentText: this.text,
        };
        await this.$store.dispatch("addComment", actionPayload);
        this.$router.replace(`/blogs/${this.$route.params.id}`);
      } catch (err) {
        this.error = err.message || "Comments cannot be added yet";
      }
    },
  },
};
</script>

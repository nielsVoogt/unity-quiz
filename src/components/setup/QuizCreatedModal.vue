<template>
  <div class="modal" v-if="show">
    we created your quiz!
    <input type="text" v-model="url" />
    <button v-on:click="startQuiz()">Copy and play</button>
  </div>
</template>

<script>
export default {
  name: "QuizCreatedModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    startQuiz() {
      this.$router.push({
        name: "play",
        params: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
}
</style>

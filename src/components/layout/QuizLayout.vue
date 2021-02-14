<template>
  <div class="quiz-layout">
    <div class="quiz-layout-top">
      <slot name="top"></slot>
    </div>
    <div class="quiz-layout-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizLayout",
};
</script>

<style lang="scss">
.quiz-layout {
  height: 100vh;
}

.quiz-layout-top {
  height: 30vh;
  background: yellow;
  padding: 2em;
}

.quiz-layout-bottom {
  height: 70vh;
  padding: 2em;
}
</style>

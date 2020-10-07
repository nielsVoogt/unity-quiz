<template>
  <div>
    <span
      v-for="(question, index) in quiz"
      :key="'indicator-' + index"
      :class="{ active: currentQuestion >= index }"
    >
      &bull;
    </span>
  </div>
</template>

<script>
export default {
  name: "quizProgress",
  props: {
    currentQuestion: {
      type: Number,
      required: true,
    },
    quiz: {
      type: Array,
      required: true,
    },
  },
};
</script>
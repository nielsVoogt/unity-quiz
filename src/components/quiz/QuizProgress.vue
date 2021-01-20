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
import { mapGetters } from "vuex";

export default {
  name: "quizProgress",
  computed: {
    ...mapGetters(["currentQuestion", "quiz"]),
  },
};
</script>

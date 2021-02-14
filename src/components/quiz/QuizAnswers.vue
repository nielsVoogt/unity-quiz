<template>
  <div>
    <div v-if="showFeedback === false">
      <button
        @click="checkAnswer(answer)"
        v-for="(answer, index) in this.quiz[this.currentQuestion].answers"
        :key="index"
      >
        {{ answer.answer }}
      </button>
    </div>
    <div v-else>
      <!-- {{ result }} -->
      <div v-if="countdown === false">Waiting for other players</div>
      <div v-else>Countdown started</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "QuizAnswers",
  computed: {
    ...mapGetters(["quiz", "countdown", "currentQuestion"]),
  },
  data() {
    return {
      showFeedback: false,
    };
  },
  watch: {
    currentQuestion: function(old, w) {
      this.showFeedback = false;
    },
  },
  methods: {
    checkAnswer(answer) {
      this.showFeedback = true;
      this.$emit("question-answered", answer.correct);
    },
  },
};
</script>

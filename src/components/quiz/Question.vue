<template>
  <div>
    <div v-if="result === null">
      <h1>{{ question.question }}</h1>
      <button
        @click="checkAnswer(answer)"
        v-for="(answer, index) in question.answers"
        :key="index"
      >
        {{ answer.answer }}
      </button>
    </div>
    <div v-else>
      {{ result }}
      <div v-if="countdown === false">Waiting for other players</div>
      <div v-else>Countdown started</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "question",
  props: {
    question: {
      type: Object,
      required: true,
    },
    countdown: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      result: null,
    };
  },
  methods: {
    checkAnswer(answer) {
      this.result = answer.correct;
      this.$emit("question-answered", answer.correct);
    },
  },
};
</script>

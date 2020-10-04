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
    <div v-else>adsdsadas</div>
  </div>
</template>

<script>
export default {
  name: "question",
  props: ["question"],
  data() {
    return {
      result: null,
    };
  },
  methods: {
    checkAnswer(answer) {
      this.result = answer.correct;
    },
  },
};
</script>
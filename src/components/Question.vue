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
    <div v-else>{{ result }}</div>
  </div>
</template>

<script>
import ChannelDetails from "@/components/ChannelDetails";

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
      this.$emit("question-answered", answer.correct);
    },
  },
};
</script>
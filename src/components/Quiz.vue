<template>
  <div v-if="currentQuestion !== quiz.length">
    <QuizProgress :quiz="quiz" :current-question="currentQuestion" />
    <Question
      :question="quiz[currentQuestion]"
      :key="currentQuestion"
      :is-quiz-master="isQuizMaster"
      :countdown="countdown"
      @question-answered="updateScore"
    />
  </div>
  <div v-else>Hello</div>
</template>

<script>
import Question from "@/components/Question";
import QuizProgress from "@/components/QuizProgress";
import { getters, mutations } from "@/store";
import ChannelDetails from "@/components/ChannelDetails";

let channel = ChannelDetails.subscribeToPusher();

export default {
  name: "quiz",
  components: {
    Question,
    QuizProgress,
  },
  computed: {
    ...getters,
  },
  methods: {
    ...mutations,

    updateScore(answer) {
      if (!this.isQuizMaster) {
        channel.trigger("client-player-anwsered-question", {});
      } else {
        if (answer === true) {
          this.incrementPlayerScore();
        }
        this.incrementCollectedAnswers();
      }
    },
  },
};
</script>
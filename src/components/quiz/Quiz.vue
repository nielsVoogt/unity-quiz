<template>
  <div>
    <QuizLayout v-if="currentQuestion === false">
      <template v-slot:top>
        Hallo, ik ben top
      </template>
      <template v-slot:bottom>
        <WaitingRoom :quiz-master="quizMaster" @start-quiz="startQuiz" />
      </template>
    </QuizLayout>

    <QuizLayout v-else>
      <template v-slot:top>
        <QuizProgress />
        {{ quiz[currentQuestion].question }}
      </template>
      <template v-slot:bottom>
        <QuizAnswers @question-answered="addAnswer" />

        {{ quiz[currentQuestion] }}
        <div>I AM COUNTDOWN: {{ countdown }}</div>
        <div>I AM PLAYER LENGTH: {{ players.length }}</div>
        <div>I AM collectedAnswers: {{ collectedAnswers }}</div>
        <div>I AM currentQuestion: {{ currentQuestion }}</div>
        <div>I AM USER ANSWERS: {{ answers }}</div>
      </template>
    </QuizLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import channelController from "@/mixins/channelController";

import WaitingRoom from "@/components/quiz/WaitingRoom";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizLayout from "@/components/layout/QuizLayout";
import QuizAnswers from "@/components/quiz/QuizAnswers";

export default {
  name: "quiz",
  mixins: [channelController],
  components: {
    WaitingRoom,
    QuizProgress,
    QuizLayout,
    QuizAnswers,
  },
  computed: {
    ...mapGetters([
      "currentQuestion",
      "quiz",
      "countdown",
      "collectedAnswers",
      "players",
      "answers",
    ]),
  },
};
</script>

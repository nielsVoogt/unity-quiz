import Vue from "vue";

// prettier-ignore
const state = Vue.observable({
  quizLocale: "null",
  quiz: [],
  currentQuestion: null,
  isQuizMaster: false,
  countdown: false,
  playerScore: 0,
  collectedAnswers: 0
});

export const getters = {
  quizLocale: () => state.quizLocale,
  quiz: () => state.quiz,
  currentQuestion: () => state.currentQuestion,
  isQuizMaster: () => state.isQuizMaster,
  countdown: () => state.countdown,
  playerScore: () => state.playerScore,
  collectedAnswers: () => state.collectedAnswers,
};

export const mutations = {
  setQuizLocale: (val) => (state.quizLocale = val),
  setQuiz: (val) => (state.quiz = val),
  setCurrentQuestion: (val) => (state.currentQuestion = val),
  incrementCurrentQuestion: () => state.currentQuestion++,
  incrementPlayerScore: () => state.playerScore++,
  setIsQuizMaster: (val) => (state.isQuizMaster = val),
  setCountdown: (val) => (state.countdown = val),
  incrementCollectedAnswers: () => state.collectedAnswers++,
  resetCollectedAnswers: () => (state.collectedAnswers = 0),
};

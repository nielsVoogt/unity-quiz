import Vue from "vue";

// prettier-ignore
const state = Vue.observable({
  quiz: [],
  currentQuestion: null,
  isQuizMaster: false,
  countdown: false,
  playerScore: 0,
  collectedAnswers: 0
});

export const getters = {
  quiz: () => state.quiz,
  currentQuestion: () => state.currentQuestion,
  isQuizMaster: () => state.isQuizMaster,
  countdown: () => state.countdown,
  playerScore: () => state.playerScore,
  collectedAnswers: () => state.collectedAnswers,
};

export const mutations = {
  setQuiz: (val) => (state.quiz = val),
  setCurrentQuestion: (val) => (state.currentQuestion = val),
  incrementCurrentQuestion: () => state.currentQuestion++,
  incrementPlayerScore: () => state.playerScore++,
  setIsQuizMaster: (val) => (state.isQuizMaster = val),
  setCountdown: (val) => (state.countdown = val),
  incrementCollectedAnswers: () => state.collectedAnswers++,
  resetCollectedAnswers: () => (state.collectedAnswers = 0),
};

const getters = {
  collectedAnswers(state) {
    return state.collectedAnswers;
  },
  currentQuestion(state) {
    return state.currentQuestion;
  },
  playerName(state) {
    return state.playerName;
  },
  players(state) {
    return state.players;
  },
  countdown(state) {
    return state.countdown;
  },
  quiz(state) {
    return state.quiz;
  },
  answers(state) {
    return state.answers;
  },
};

export default getters;

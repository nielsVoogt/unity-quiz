const getters = {
  currentQuestion(state) {
    return state.currentQuestion;
  },
  playerName(state) {
    return state.playerName;
  },
  players(state) {
    return state.players;
  },
  quiz(state) {
    return state.quiz;
  },
};

export default getters;

import * as types from "./mutation-types.js";

const actions = {
  incrementCollectedAnswersAction({ commit }) {
    commit(types.INCREMENT_COLLECTED_ANSWERS);
  },
  addAnswerAction({ commit }, answer) {
    commit(types.ADD_ANSWER, answer);
    commit(types.INCREMENT_COLLECTED_ANSWERS);
  },
  nextQuestionAction({ commit, state }) {
    if (state.currentQuestion + 1 === state.quiz.length) {
      console.log("end reached");
      return;
    }

    commit(types.SET_COUNTDOWN, true);
    setTimeout(() => {
      commit(types.SET_COUNTDOWN, false);
      commit(types.RESET_COLLECTED_ANSWERS);
      commit(types.INCREMENT_CURRENT_QUESTION);
    }, 5000);
  },
  incrementCurrentQuestionAction({ commit }) {
    commit(types.INCREMENT_CURRENT_QUESTION);
  },
  addPlayerNameAction: ({ commit }, player) => {
    commit(types.ADD_PLAYER_NAME, player);
  },
  addPlayerAction: ({ commit }, player) => {
    commit(types.ADD_PLAYER, player);
  },
  addPlayersAction: ({ commit }, players) => {
    commit(types.ADD_PLAYERS, players);
  },
  addQuizAction: ({ commit }, quiz) => {
    commit(types.ADD_QUIZ, quiz);
  },
  startQuizAction: ({ commit }) => {
    commit(types.START_QUIZ);
  },
};

export default actions;

import * as types from "./mutation-types.js";

const mutations = {
  [types.INCREMENT_CURRENT_QUESTION](state) {
    state.currentQuestion++;
  },
  [types.INCREMENT_COLLECTED_ANSWERS](state) {
    state.collectedAnswers++;
  },
  [types.RESET_COLLECTED_ANSWERS](state) {
    state.collectedAnswers = 0;
  },
  [types.SET_COUNTDOWN](state, value) {
    state.countdown = value;
  },
  [types.ADD_ANSWER](state, answer) {
    state.answers.unshift(answer);
  },
  [types.ADD_PLAYER_NAME](state, name) {
    state.playerName = name;
  },
  [types.ADD_PLAYER](state, player) {
    state.players.unshift(player);
  },
  [types.ADD_PLAYERS](state, players) {
    state.players = players;
  },
  [types.ADD_QUIZ](state, quiz) {
    state.quiz = quiz;
  },
  [types.START_QUIZ](state) {
    state.currentQuestion = 0;
  },
};

export default mutations;

import * as types from "./mutation-types.js";

const mutations = {
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
};

export default mutations;

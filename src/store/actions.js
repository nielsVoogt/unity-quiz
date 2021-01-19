import * as types from "./mutation-types.js";

const actions = {
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
};

export default actions;

import * as types from "./mutation-types.js";

const actions = {
  addPlayerNameAction: ({ commit }, player) => {
    commit(types.ADD_PLAYER_NAME, player);
  },
  addPlayerAction: ({ commit }, player) => {
    commit(types.ADD_PLAYER, player);
  },
  addQuizAction: ({ commit }, quiz) => {
    commit(types.ADD_QUIZ, quiz);
  },
};

export default actions;

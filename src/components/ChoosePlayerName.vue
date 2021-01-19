<template>
  <div>
    <label>Choose a nickname</label>
    <input type="text" v-model="playerName" />
    <button @click="addPlayer">Next step</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "choosePlayerName",
  data() {
    return {
      playerName: "",
    };
  },
  methods: {
    ...mapActions(["addPlayerNameAction"]),
    addPlayer() {
      this.addPlayerNameAction(this.playerName);
    },
  },
};
</script>

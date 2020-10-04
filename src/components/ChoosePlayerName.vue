<template>
  <div>
    <label>Choose a nickname</label>
    <input type="text" v-model="playerName" />
    <button @click="addPlayer">Next step</button>
  </div>
</template>

<script>
export default {
  name: "choosePlayerName",
  data() {
    return {
      playerName: "",
    };
  },
  methods: {
    addPlayer() {
      this.$emit("player-added", this.playerName);
    },
  },
};
</script>
<template>
  <div class="choose-name-layout">
    <div class="choose-name-layout-top">
      Howdy player!
    </div>
    <div class="choose-name-layout-bottom">
      <label>Choose a nickname</label>
      <input type="text" v-model="playerName" />
      <button @click="addPlayer">Next step</button>
    </div>
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

<style lang="scss">

.choose-name-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.choose-name-layout-top {
  background: blue;
  padding: 2em;
  flex: 1;
}

.choose-name-layout-bottom {
  padding: 2em;
  background: yellow;
}

</style>
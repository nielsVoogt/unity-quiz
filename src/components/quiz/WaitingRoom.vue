<template>
  <div class="quiz-waitingroom">
    <ul v-if="players && players.length">
      <li v-for="(player, index) in players" :key="index" class="player">
        <span class="player-number">{{ index }}</span>
        <span class="player-name">{{ player }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "waitingRoom",
  computed: {
    ...mapGetters(["players"]),
  },
};
</script>

<style lang="scss">
// ------------- PLAYER CONTAINER

.quiz-waitingroom {
  background: #ffffff;
  border-radius: 1em;
  min-height: 100%;
  overflow: auto;
}

// ------------- PLAYER

.player {
  padding: 1.25em;
  border-bottom: 1px solid #ededed;
  display: flex;
  line-height: normal;

  .player-number {
    font-weight: 700;
    margin-right: 1em;
  }

  .player-name {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

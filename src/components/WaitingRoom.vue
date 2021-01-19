<template>
  <div>
    <h1>Players</h1>
    <ul v-if="players.length">
      <li v-for="(player, index) in players" :key="index">
        {{ player }}
      </li>
    </ul>
    <div v-else>Loading players</div>
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

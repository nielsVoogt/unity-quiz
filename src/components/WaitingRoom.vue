<template>
  <div>
    <h1>Players</h1>
    <ul>
      <li v-for="player in players" :key="player.id">
        {{ player.name }}
      </li>
    </ul>

    <div v-if="isQuizMaster">
      <p>Invite people with the following url:</p>
      <div>{{ url }}</div>
      <br />
      <button :disabled="players.length === 1" @click="startQuiz">
        Start the quiz
      </button>
    </div>
    <div v-else>Waiting on quizmaster to start the quiz</div>
  </div>
</template>

<script>
export default {
  name: "waitingRoom",
  props: ["players", "isQuizMaster", "url"],
  methods: {
    startQuiz() {
      this.$emit("start-quiz");
    },
  },
};
</script>

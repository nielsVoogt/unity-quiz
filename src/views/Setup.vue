<template>
  <div>
    <ChoosePlayerName v-if="!playerName" />
    <CreateQuiz v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ChoosePlayerName from "@/components/ChoosePlayerName";
import CreateQuiz from "@/components/CreateQuiz";

export default {
  name: "setup",
  components: {
    ChoosePlayerName,
    CreateQuiz,
  },
  computed: {
    ...mapGetters(["playerName"]),
  },
};
</script>

<template>
  <ChoosePlayerName v-if="!playerName" />
  <CreateQuiz v-else />
</template>

<script>
import { mapGetters } from "vuex";

import ChoosePlayerName from "@/components/setup/ChoosePlayerName";
import CreateQuiz from "@/components/setup/CreateQuiz";

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

<template>
  <div>
    <ChoosePlayerName v-if="!playerName" />
    <Quiz v-else />
  </div>
</template>

<script>
import ChoosePlayerName from "@/components/setup/ChoosePlayerName";
import Quiz from "@/components/quiz/Quiz";

import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    ChoosePlayerName,
    Quiz,
  },
  computed: {
    ...mapGetters(["playerName"]),
  },
  mounted() {
    console.log("locale home", this.$i18n.locale);
  },
};
</script>

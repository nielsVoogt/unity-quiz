<template>
  <transition name="slide">
    <ChoosePlayerName v-if="!playerName" />
    <CreateQuiz v-else />
  </transition>
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
  data() {
    return {
      animationFinished: false,
    }
  },
  computed: {
    ...mapGetters(["playerName"]),
  },
};
</script>

<style>

.slide-leave-active,
.slide-enter-active {
  transition: all 1s;
  position: absolute;
  width: 100%;
  top: 0;
}

.slide-enter {
  transform: translateY(100%);
}

.slide-leave-to {
  transform: translateY(-100%);
}

</style>
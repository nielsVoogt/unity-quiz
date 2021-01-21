<template>
  <div class="container">
    <transition name="slide">
      <ChoosePlayerName v-if="!playerName" />
      <CreateQuiz v-else />
    </transition>
  </div>
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

.container {
  height: 100vh;
  overflow: hidden;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 2s;
  position: absolute;
  top: 0;
  width: 100%;
}

.slide-enter {
  transform: translateY(100%);
}

.slide-leave-to {
  transform: translateY(-100%);
}

</style>
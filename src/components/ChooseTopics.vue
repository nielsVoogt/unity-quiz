<template>
  <div>
    <p>Select one or more quiz topics</p>
    <div>
      <label for="substance-xtc">XTC</label>
      <input type="checkbox" id="substance-xtc" value="xtc" v-model="selectedTopics" />
    </div>

    <div>
      <label for="substance-cannabis">Weed</label>
      <input type="checkbox" id="substance-cannabis" value="cannabis" v-model="selectedTopics" />
    </div>

    <div>
      <label for="substance-ghb">GHB</label>
      <input type="checkbox" id="substance-ghb" value="ghb" v-model="selectedTopics" />
    </div>

    <button @click="createQuizFromSelectedTopics">Invite friends</button>
  </div>
</template>

<script>
import ChoosePlayerNameVue from "./ChoosePlayerName.vue";
import { cannabis } from "@/topics/cannabis";
import { xtc } from "@/topics/xtc";
import { ghb } from "@/topics/ghb";

export default {
  name: "chooseTopics",
  data() {
    return {
      selectedTopics: [],
      topics: {},
    };
  },
  methods: {
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    createQuizFromSelectedTopics() {
      let quiz = [];
      this.selectedTopics.forEach((topic) => {
        quiz.push(this.topics[topic]);
      });

      const shuffledQuiz = this.shuffle(quiz.flat());

      this.$emit("quiz-built", shuffledQuiz);
    },
  },
  mounted() {
    this.topics.cannabis = cannabis[this.$i18n.locale];
    this.topics.xtc = xtc[this.$i18n.locale];
    this.topics.ghb = ghb[this.$i18n.locale];
  },
};
</script>

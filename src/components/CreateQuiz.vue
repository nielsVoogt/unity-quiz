<template>
  <div>
    <p>Select one or more quiz topics</p>
    <div>
      <label for="substance-xtc">XTC</label>
      <input
        type="checkbox"
        id="substance-xtc"
        value="xtc"
        v-model="selectedTopics"
      />
    </div>

    <div>
      <label for="substance-cannabis">Weed</label>
      <input
        type="checkbox"
        id="substance-cannabis"
        value="cannabis"
        v-model="selectedTopics"
      />
    </div>

    <div>
      <label for="substance-ghb">GHB</label>
      <input
        type="checkbox"
        id="substance-ghb"
        value="ghb"
        v-model="selectedTopics"
      />
    </div>

    <p>{{ selectedTopics.length }} topics selected</p>

    <button @click="createQuizFromSelectedTopics">Create quiz</button>

    <div class="modal" v-if="showModal">
      we created your quiz!
      <input type="text" v-model="url" />
      <button @click="startQuiz()">Copy and play</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { cannabis } from "@/topics/cannabis";
import { xtc } from "@/topics/xtc";
import { ghb } from "@/topics/ghb";

export default {
  name: "CreateQuiz",
  data() {
    return {
      selectedTopics: [],
      topics: {},
      showModal: false,
      id: false,
      url: false,
    };
  },
  methods: {
    ...mapActions(["addQuizAction"]),

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
      this.addQuizAction(shuffledQuiz);
      this.generateQuizUrl();
    },

    generateQuizUrl() {
      this.id = Math.random()
        .toString(36)
        .substr(2, 8);
      this.url = `localhost:8080${this.id}`;
      this.showQuizBuiltModal();
    },

    showQuizBuiltModal() {
      this.showModal = true;
    },

    startQuiz() {
      this.$router.push({ name: "play", params: { id: this.id } });
    },
  },
  mounted() {
    this.topics.cannabis = cannabis[this.$i18n.locale];
    this.topics.xtc = xtc[this.$i18n.locale];
    this.topics.ghb = ghb[this.$i18n.locale];
  },
};
</script>

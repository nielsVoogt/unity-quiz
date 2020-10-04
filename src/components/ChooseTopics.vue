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
      <label for="substance-weed">Weed</label>
      <input
        type="checkbox"
        id="substance-weed"
        value="mariuahana"
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

    <button @click="createQuizFromSelectedTopics">Invite friends</button>
  </div>
</template>


<script>
import ChoosePlayerNameVue from "./ChoosePlayerName.vue";
const mariuahana = [
  {
    question: ".... mariuahan 1",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
  {
    question: ".... mariuahan 2",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
];

const ghb = [
  {
    question: ".... ghb 1",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
  {
    question: ".... ghb 2",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
];

const xtc = [
  {
    question: ".... xtc 1",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
  {
    question: ".... xtc 2",
    answers: [
      { answer: "a", correct: false },
      { answer: "b", correct: true },
    ],
    feedback: "bla..",
  },
];

export default {
  name: "chooseTopics",
  data() {
    return {
      selectedTopics: [],
      topics: {
        xtc,
        ghb,
        mariuahana,
      },
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
        let topicContent = this.topics[topic];
        quiz.push(this.topics[topic]);
      });

      const shuffledQuiz = this.shuffle(quiz.flat());

      this.$emit("quiz-built", shuffledQuiz);
    },
  },
};
</script>
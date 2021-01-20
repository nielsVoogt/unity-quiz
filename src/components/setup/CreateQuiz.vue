<template>
  <QuizLayout>
    <template v-slot:top>
      <p>Select one or more quiz topics</p>
    </template>
    <template v-slot:bottom>

      <VueSlickCarousel :arrows="false" :dots="false" v-if="topics" v-bind="slickSettings">
        <div v-for="(topic, topicName, index) in topics" :key="index" class="topic" @click="addOrRemoveTopic(topicName)">
          <div class="topic-details">
            <div class="topic-name">{{ topicName }}</div>
            <div class="topic-question-count">{{ topic.length }} questions</div>
          </div>
          <div class="topic-button">
            <button v-if="selectedTopics.includes(topicName)">
              Add topic
            </button>
            <button v-else>
              Add topic
            </button>
          </div>
        </div>
      </VueSlickCarousel>

      <p>{{ selectedTopics.length }} topics selected</p>
      <button @click="createQuizFromSelectedTopics">Create quiz</button>
    </template>

    {{ selectedTopics }}

    <div class="modal" v-if="showModal">
      we created your quiz!
      <input type="text" v-model="url" />
      <button v-on:click="startQuiz()">Copy and play</button>
    </div>
  </QuizLayout>
</template>

<script>
import { mapActions } from "vuex";
import QuizLayout from "@/components/layout/QuizLayout";

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import { cannabis } from "@/topics/cannabis";
import { xtc } from "@/topics/xtc";
import { ghb } from "@/topics/ghb";

export default {
  name: "CreateQuiz",
  components: {
    QuizLayout,
    VueSlickCarousel
  },
  data() {
    return {
      selectedTopics: [],
      topics: false,
      showModal: false,
      id: false,
      url: false,
      slickSettings: {
        focusOnSelect: false,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "50px",
        infinite: true,
      }
    };
  },
  methods: {
    ...mapActions(["addQuizAction"]),

    addOrRemoveTopic(topic) {
      if(this.selectedTopics.includes(topic)) {
        this.selectedTopics = this.selectedTopics.filter(e => e !== topic);
      } else {
        this.selectedTopics.push(topic);
      }
    },

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
    this.topics = {
      cannabis: cannabis[this.$i18n.locale],
      xtc: xtc[this.$i18n.locale],
      ghb: ghb[this.$i18n.locale]
    }
  },
};
</script>

<style lang="scss">

.slick-slide {
  padding: .5em;
  transform: scale(.9);
  transition: transform .2s ease-in;

  &.slick-center {
    transform: none;
  }
}

.topic {
  background: grey;
  text-align: center;

  .topic-details {
    padding: 1.5em;
  }

  .topic-name {
    font-weight: 700;
    font-size: 21px;
    margin-bottom: .5em;
  }

  .topic-question-count {
    color: #9F9F9F;
  }

  .topic-button {
    padding: 1.5em;
    border-top: 1px solid red;
  }
}

</style>
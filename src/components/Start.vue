<template>
  <div>
    {{ $i18n.locale }}
    <ChoosePlayerName @player-added="setNewPlayer" v-if="playerState === 'ADD_PLAYER'" />
    <ChooseTopics @quiz-built="setNewQuiz" v-if="playerState === 'BUILD_QUIZ'" />
    <WaitingRoom
      @start-quiz="startQuiz"
      v-if="playerState === 'WAITING'"
      :is-quiz-master="isQuizMaster"
      :players="players"
      :url="url"
    />
    <Quiz v-if="playerState === 'PLAYING'" />
  </div>
</template>

<script>
import ChannelDetails from "@/components/ChannelDetails";
import ChooseTopics from "@/components/ChooseTopics";
import ChoosePlayerName from "@/components/ChoosePlayerName";
import WaitingRoom from "@/components/WaitingRoom";
import Quiz from "@/components/Quiz";
import { getters, mutations } from "@/store";

let channel = ChannelDetails.subscribeToPusher();

export default {
  name: "start",
  components: {
    ChoosePlayerName,
    ChooseTopics,
    WaitingRoom,
    Quiz,
  },
  data() {
    return {
      presenceId: null,
      player: null,
      players: [],
      playerState: "ADD_PLAYER",
      url: false,
    };
  },
  computed: {
    ...getters,
  },
  watch: {
    collectedAnswers(val) {
      if (this.currentQuestion === this.quiz.length) {
        // Retrieve all user scores and display score
        alert("Quiz ended");
      }

      // Check if all players answered the question
      if (val === this.players.length) {
        this.triggerNextQuestion();
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mutations,

    fetchData() {
      // Sets the data instance presenceId variable to the result of the getUniqueId function
      this.presenceId = this.getUniqueId();

      // This checks if there's no presence ID in the URL via the checkPresenceID function and
      // appends the presenceId to the current URL so that we can have the URL end with a parameter
      if (!this.checkPresenceID()) {
        var separator = window.location.href.indexOf("?") === -1 ? "?" : "&";
        window.location.href = window.location.href + separator + this.presenceId;
      }

      // Sets the data instance url variable to the current URL.
      this.url = window.location.href;

      // The pusher:member_added event is triggered when a user joins a channel.
      channel.bind("pusher:member_added", (members) => {
        console.log("member added");

        // When a new player enters a quiz we send the quiz and the quizLocale of the quizmaster
        channel.trigger("client-send-quiz", {
          data: {
            quiz: this.quiz,
            quizLocale: this.quizLocale,
          },
        });
      });

      // Once a subscription has been made to a presence channel, an event is triggered with a members iterator.
      channel.bind("pusher:subscription_succeeded", (members) => {
        console.log("subscription succeeded");
        if (members.count === 1) this.setIsQuizMaster(true);
      });

      channel.bind("client-send-quiz", (payload) => {
        console.log("send-quiz");
        this.setQuiz(payload.data.quiz);
        this.$i18n.locale = payload.data.quizLocale;
      });

      channel.bind("client-add-player", (payload) => {
        this.player = payload.data;
        this.players.push(payload.data);
        channel.trigger("client-update-players", { data: this.players });
      });

      channel.bind("client-update-players", (payload) => {
        this.players = payload.data;
      });

      channel.bind("client-player-anwsered-question", () => {
        this.incrementCollectedAnswers();
      });

      channel.bind("client-question-update", (payload) => {
        this.playerState = "PLAYING";
        this.setCurrentQuestion(payload.data);
      });

      channel.bind("client-next-question", () => {
        this.nextQuestion();
      });
    },

    setNewQuiz(quiz) {
      this.setQuizLocale(this.$i18n.locale);
      this.setQuiz(quiz);
      this.playerState = "WAITING";
    },

    startQuiz() {
      this.playerState = "PLAYING";
      this.setCurrentQuestion(0);
      channel.trigger("client-question-update", { data: this.currentQuestion });
    },

    triggerNextQuestion() {
      channel.trigger("client-next-question", {});
      this.nextQuestion();
    },

    nextQuestion() {
      this.setCountdown(true);
      let self = this;
      setTimeout(function() {
        self.incrementCurrentQuestion();
        self.resetCollectedAnswers();
        self.setCountdown(false);
      }, 3000);
    },

    setNewPlayer(name) {
      if (this.isQuizMaster) {
        this.players.push(name);
        this.playerState = "BUILD_QUIZ";
      } else {
        channel.trigger("client-add-player", { data: name });
        this.playerState = "WAITING";
      }
    },

    checkPresenceID() {
      let getQueryString = (field, url) => {
        let href = url ? url : window.location.href;
        let reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
        let string = reg.exec(href);
        return string ? string[1] : null;
      };
      let id = getQueryString("id");
      return id;
    },

    getUniqueId() {
      return (
        "id=" +
        Math.random()
          .toString(36)
          .substr(2, 8)
      );
    },
  },
  mounted() {
    const selectedLocale = sessionStorage.getItem("locale");
    if (selectedLocale) this.$i18n.locale = selectedLocale;
  },
};
</script>

<style>
.active {
  color: red;
  display: block;
}
</style>

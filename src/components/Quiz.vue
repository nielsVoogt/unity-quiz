<template>
  <div>
    <!-- <div>isQuizMaster: {{ isQuizMaster }}</div> -->

    <component
      v-bind:is="currentTabComponent"
      :is-quiz-master="isQuizMaster"
      :players="players"
      :url="url"
      @player-added="setNewPlayer"
      @quiz-built="setQuiz"
      @start-quiz="startQuiz"
      v-if="currentQuestion === false"
    />

    <div v-if="currentQuestion !== false">
      <div v-if="currentQuestion !== quiz.length">
        <QuizProgress :quiz="quiz" :current-question="currentQuestion" />
        <Question
          :question="quiz[currentQuestion]"
          :key="currentQuestion"
          :is-quiz-master="isQuizMaster"
          @question-answered="updateScore"
        />
      </div>
      <div v-else>Hello</div>
    </div>
  </div>
</template>

<script>
import ChannelDetails from "@/components/ChannelDetails";
import ChooseTopics from "@/components/ChooseTopics";
import ChoosePlayerName from "@/components/ChoosePlayerName";
import WaitingRoom from "@/components/WaitingRoom";
import Question from "@/components/Question";
import QuizProgress from "@/components/QuizProgress";

export default {
  name: "quiz",
  components: {
    ChoosePlayerName,
    ChooseTopics,
    WaitingRoom,
    Question,
    QuizProgress,
  },
  data() {
    return {
      currentTabComponent: ChoosePlayerName,
      playerId: null,
      playerScore: 0,
      isQuizMaster: null,
      presenceId: null, // This holds the current presence-id
      players: [],
      url: false, // This holds the current URL of the game
      quiz: [],
      currentQuestion: false,
      collectedAnswers: 0,
    };
  },
  watch: {
    collectedAnswers(val) {
      if (this.currentQuestion === this.quiz.length) {
        // Retrieve all user scores and display score
        alert("ho");
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
    fetchData() {
      // Sets the data instance presenceId variable to the result of the getUniqueId function
      this.presenceId = this.getUniqueId();

      // This checks if there's no presence ID in the URL via the checkPresenceID function and
      // appends the presenceId to the current URL so that we can have the URL end with a parameter
      // like this https://hamilton-lyrics.firebaseapp.com/#/?id=agbew0gz

      if (!this.checkPresenceID()) {
        var separator = window.location.href.indexOf("?") === -1 ? "?" : "&";
        window.location.href =
          window.location.href + separator + this.presenceId;
      }

      // Sets the data instance url variable to the current URL.
      this.url = window.location.href;

      // The channel variable is set to to the subscribeToPusher function in ChannelDetails.
      let channel = ChannelDetails.subscribeToPusher();

      // ----------------------------------------------------------------------------------------- //
      // ------------------------------------- PUSHER EVENTS ------------------------------------- //
      // ----------------------------------------------------------------------------------------- //

      // The pusher:member_added event is triggered when a user joins a channel.
      channel.bind("pusher:member_added", (members) => {
        console.log("member_added", members);
        channel.trigger("client-send-quiz", { data: this.quiz });
      });

      // Once a subscription has been made to a presence channel, an event is triggered with a members iterator.
      channel.bind("pusher:subscription_succeeded", (members) => {
        console.log("subscription_succeeded", members.me.id);

        this.playerId = members.me.id;

        if (members.count !== 1) {
          console.log("Found more players");
        } else {
          this.isQuizMaster = true;
        }
      });

      // The pusher:member_removed is triggered when a user leaves a channel. We decrease the number of players by one and also set the secondplayer boolean to false.
      channel.bind("pusher:member_removed", (member) => {
        console.log("member_removed", member);

        if (member.count === 1) {
          console.log("Only one left");
        }
      });

      // ----------------------------------------------------------------------------------------- //
      // ------------------------------------- CUSTOM EVENTS ------------------------------------- //
      // ----------------------------------------------------------------------------------------- //

      channel.bind("client-send-quiz", (payload) => {
        this.quiz = payload.data;
      });

      channel.bind("client-add-player", (payload) => {
        this.players.push(payload.data);
        channel.trigger("client-update-players", { data: this.players });
      });

      channel.bind("client-update-players", (payload) => {
        this.players = payload.data;
      });

      channel.bind("client-player-anwsered-question", (payload) => {
        this.collectedAnswers++;
      });

      channel.bind("client-question-update", (payload) => {
        this.currentQuestion = payload.data;
      });

      channel.bind("client-next-question", (payload) => {
        this.nextQuestion();
      });

      if (this.checkPresenceID()) {
        this.shareUrl = this.url;
      }
    },

    getUniqueId() {
      return "id=" + Math.random().toString(36).substr(2, 8);
    },

    setQuiz(quiz) {
      this.quiz = quiz;
      this.currentTabComponent = WaitingRoom;
    },

    startQuiz() {
      this.currentQuestion = 0;
      let channel = ChannelDetails.subscribeToPusher();
      channel.trigger("client-question-update", {
        data: this.currentQuestion,
      });
    },

    triggerNextQuestion() {
      let channel = ChannelDetails.subscribeToPusher();
      channel.trigger("client-next-question", {});
      this.nextQuestion();
    },

    nextQuestion() {
      this.currentQuestion++;
      this.collectedAnswers = 0;
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

    updateScore(answer) {
      if (!this.isQuizMaster) {
        let channel = ChannelDetails.subscribeToPusher();
        channel.trigger("client-player-anwsered-question", {});
      } else {
        if (answer === true) {
          this.playerScore++;
        }
        this.collectedAnswers++;
      }
    },

    setNewPlayer(name) {
      const player = {
        name: name,
        id: this.playerId,
      };

      if (this.isQuizMaster) {
        this.players.push(player);
        this.currentTabComponent = ChooseTopics;
      } else {
        let channel = ChannelDetails.subscribeToPusher();
        channel.trigger("client-add-player", {
          data: player,
        });
        this.currentTabComponent = WaitingRoom;
      }
    },
  },
};
</script>

<style>
.active {
  color: red;
  display: block;
}
</style>
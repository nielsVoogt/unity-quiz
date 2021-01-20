<template>
  <div>
    <QuizLayout v-if="currentQuestion === false">
      <template v-slot:top>
        Hallo, ik ben top
      </template>
      <template v-slot:bottom>
        <WaitingRoom />
      </template>
    </QuizLayout>

    <QuizLayout v-else>
      <template v-slot:top>
        <QuizProgress />
      </template>
      <template v-slot:bottom>
        Hallo, ik ben bottom
      </template>
    </QuizLayout>

<!--    {{ quizMaster }}-->
<!--    {{ players }}-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import WaitingRoom from "@/components/quiz/WaitingRoom";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizLayout from "@/components/layout/QuizLayout";

// import Pusher from "pusher-js";
//
// const pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
//   cluster: process.env.VUE_APP_PUSHER_CLUSTER,
//   authEndpoint: process.env.VUE_APP_PUSHER_URL,
//   encrypted: true,
// });

let channel;
const debug = true;

export default {
  name: "quiz",
  components: {
    WaitingRoom,
    QuizProgress,
    QuizLayout,
  },
  data() {
    return {
      quizMaster: false,
    };
  },
  computed: {
    ...mapGetters(["playerName", "players", "quiz", "currentQuestion"]),
  },
  methods: {
    ...mapActions(["addPlayersAction", "addPlayerAction", "addQuizAction"]),

    // bindPusher() {
    //   channel.bind("pusher:member_added", (member) => {
    //     if (debug) console.log("member added", member.id);
    //
    //     // This prevents every channel subscriber from sending the setup
    //     if (this.quizMaster) {
    //       channel.trigger(`client-${member.id}-setup`, {
    //         players: this.players,
    //         quiz: this.quiz,
    //       });
    //     }
    //   });
    //
    //   // Once a subscription has been made to a presence channel
    //   channel.bind("pusher:subscription_succeeded", (members) => {
    //     if (debug) console.log("subscription succeeded", members.me.id);
    //
    //     // If we are the first one in the channel, we are the quizmaster
    //     if (members.count === 1) {
    //       this.quizMaster = true;
    //       // We add ourselves to the players array
    //       this.addPlayerAction(this.playerName);
    //     } else {
    //       // Bind to channel with own ID to receive initial setup (quiz, players, locale)
    //       channel.bind(`client-${members.me.id}-setup`, (data, metadata) => {
    //         if (debug) console.log("received", data, "from", metadata.user_id);
    //
    //         this.addPlayersAction(data.players); // Initial setup of existing players
    //         this.addQuizAction(data.quiz); // Initial setup of local quiz object
    //         this.addPlayerAction(this.playerName); // We add ourselves to the players array
    //
    //         // We share our name with other players so they can update their players array
    //         channel.trigger("client-updates", {
    //           type: "newPlayer",
    //           payload: {
    //             name: this.playerName,
    //           },
    //         });
    //       });
    //     }
    //
    //     // Every user listens to client-updates
    //     channel.bind("client-updates", (data) => {
    //       console.log("i received ", data.type);
    //       if (data.type === "newPlayer") {
    //         this.addPlayerAction(data.payload.name);
    //       }
    //     });
    //   });
    // },
  },

  created() {
    // channel = pusher.subscribe(`presence-${this.$route.params.id}`);
    // this.bindPusher();
  },
};
</script>

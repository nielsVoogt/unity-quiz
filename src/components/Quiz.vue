<template>
  <div>
    <!-- WAITINGROOM -->
    <!-- QUIZQUESTIONS -->
    <!-- QUIZRESULTS -->
    {{ quizMaster }}
  </div>
</template>

<script>
import Pusher from "pusher-js";

const pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  authEndpoint: process.env.VUE_APP_PUSHER_URL,
  encrypted: true,
});

let channel;

export default {
  name: "quiz",
  data() {
    return {
      quizMaster: false,
      players: [],
    };
  },
  methods: {
    bindPusher() {
      channel.bind("pusher:member_added", (member) => {
        console.log("member added", member.id);

        // This prevents every channel subscriber from sending the setup
        if (this.quizMaster) {
          channel.trigger(`client-${member.id}-setup`, { data: { a: 1 } });
        }
      });

      // Once a subscription has been made to a presence channel
      channel.bind("pusher:subscription_succeeded", (members) => {
        console.log("subscription succeeded", members.me.id);
        console.log(members.count === 1);

        // If we are the first one in the channel, we are the quizmaster
        if (members.count === 1) {
          this.quizMaster = true;
        } else {
          // Bind to channel with own ID to receive initial setup (quiz, locale)
          channel.bind(`client-${members.me.id}-setup`, (data, metadata) => {
            console.log("I received", data, "from user", metadata.user_id);
          });
        }
      });
    },
  },
  created() {
    channel = pusher.subscribe(`presence-${this.$route.params.id}`);
    this.bindPusher();
  },
};
</script>

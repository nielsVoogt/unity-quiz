<template>
  <transition name="fade">
    <div class="home" v-if="!multiplePlayers">
      <div class="inner">
        <p>{{ shareUrl }}</p>
      </div>
    </div>
    <div class="play" v-if="multiplePlayers">
      <h1>Multiple players detected</h1>
      <h2>{{ yolo }}</h2>
      <button @click="doStuff">Do stuff</button>
    </div>
  </transition>
</template>

<script>
import ChannelDetails from "@/components/ChannelDetails";

export default {
  name: "quiz",
  data() {
    return {
      presenceId: null, // This holds the current presence-id
      multiplePlayers: false, // This checks if there's a second player, it becomes true when players = 2
      playerData: null,
      userId: null, // This holds the userId for the current player
      url: false, // This holds the current URL of the game
      shareUrl: null,
      yolo: "Yoloooooo",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // Sets the data instance presenceId variable to the result of the getUniqueId function
      this.presenceId = this.getUniqueId();

      // This checks if there's no presence ID in the URL via the checkPresenceID function and appends the presenceId to the current URL so that we can have the URL end with a parameter like this https://hamilton-lyrics.firebaseapp.com/#/?id=agbew0gz
      if (!this.checkPresenceID()) {
        var separator = window.location.href.indexOf("?") === -1 ? "?" : "&";
        window.location.href =
          window.location.href + separator + this.presenceId;
      }

      // Sets the data instance url variable to the current URL.
      this.url = window.location.href;

      // The channel variable is set to to the subscribeToPusher function in ChannelDetails.
      let channel = ChannelDetails.subscribeToPusher();

      // The pusher:member_added event is triggered when a user joins a channel. We increase the number of players by one and also set the secondplayer boolean to true.
      channel.bind("pusher:member_added", (members) => {
        console.log("member_added", members);
        this.multiplePlayers = true;
      });

      // Once a subscription has been made to a presence channel, an event is triggered with a members iterator.
      channel.bind("pusher:subscription_succeeded", (members) => {
        console.log("subscription_succeeded", members);
        if (members.count !== 1) {
          console.log("Found more players");
          this.multiplePlayers = true;
        }

        this.playerData = members;
      });

      // The pusher:member_removed is triggered when a user leaves a channel. We decrease the number of players by one and also set the secondplayer boolean to false.
      channel.bind("pusher:member_removed", (member) => {
        console.log("member_removed", member);

        if (member.count === 1) {
          this.multiplePlayers = false;
        }
      });

      // This function receives new data from Pusher and updates the exisiting scores. This is what updates each player's score in realtime.
      channel.bind("client-send", (data) => {
        console.log("client-send", data);
      });

      if (this.checkPresenceID()) {
        this.shareUrl = this.url;
      }
    },

    getUniqueId() {
      return "id=" + Math.random().toString(36).substr(2, 8);
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

    doStuff() {
      this.yolo = "lalala";
      let channel = ChannelDetails.subscribeToPusher();
      channel.trigger("client-send", { data: this.yolo });
    },
  },
};
</script>


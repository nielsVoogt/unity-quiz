# unity-quiz

A multiplayer harm reduction quiz you can play with your friends that doesn't require login or saves any user information.<br>
Uses `Vue`, `Pusher`, `i18n`, `Vue Router` and `Vuex`.

### Why did I start this project?

My SO is a peer educator for Unity. Unity is a free drug education/harm reduction service funded by the Dutch goverment to educate ravers on various substances when visiting a rave. Due to the corona virus there are no party's and raves to provide this education, but that doesn't mean people stopped taking drugs. In my opinion harm reduction is a great way to reduce accidental overdoses, increase knowledge on various substances and educate people on responsible drug use. To fill that gap in corona times I deceided to start this project. I was looking for a project to improve my Vue skills and this is a fun and challenging project to build.

I'm planning on hosting the quiz on Firebase and see if people pick it up.

### Run the project locally

Add your pusher credentials in the .env file:

```
VUE_APP_PUSHER_APP_ID=YOUR_PUSHER_APP_ID
VUE_APP_PUSHER_KEY=YOUR_PUSHER_KEY
VUE_APP_PUSHER_SECRET=YOUR_PUSHER_SECRET
VUE_APP_PUSHER_CLUSTER=YOUR_PUSHER_CLUSTER
```

Then run the following commands:

```
$ npm install
$ npm run serve
$ npm run dev
```

After running these commands visit http://localhost:8080/

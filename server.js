// server.js
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const Pusher = require("pusher");
const crypto = require("crypto");

//initialize Pusher with your appId, key and secret
const pusher = new Pusher({
  appId: process.env.VUE_APP_PUSHER_APP_ID,
  key: process.env.VUE_APP_PUSHER_KEY,
  secret: process.env.VUE_APP_PUSHER_SECRET,
  cluster: process.env.VUE_APP_PUSHER_CLUSTER,
  encrypted: true,
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// The code below helps to fix any potential CORS issue.
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

// Index API route for the Express app
app.get("/", (req, res) => {
  res.send("Welcome");
});

// API route used by Pusher as a way of authenticating users
app.post("/pusher/auth", (req, res) => {
  let socketId = req.body.socket_id;
  let channel = req.body.channel_name;
  // Generate a random string and use as presence channel user_id
  let presenceData = {
    user_id: crypto.randomBytes(16).toString("hex"),
  };
  let auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

// Set port to be used by Node.js
app.set("port", 5000);

app.listen(app.get("port"), () => {
  console.log("Node app is running on port", app.get("port"));
});

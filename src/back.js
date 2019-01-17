//Author: Joni Tuhkanen
//this the main file of serverside
const path = require('path');
const cors = require("cors");
const express = require("express");
const messages = require("./messages.js");
const topics = require("./topic_names.js");
const chineseNumbers = require("./topics/chinese_numbers.js");
const jokes = require("./topics/jokes.js");
const europeanCapitals = require("./topics/european_capitals.js");
const mathematicalConstants = require("./topics/mathematical_constants.js");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname + "/../frontend/dist/")));

const port = process.env.PORT || 3000;
/*
app.get("/", (req, res) =>
  {
    res.sendFile(path.join(__dirname + "/../frontend/dist/index.html"));
  }
);
*/
function randomMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)];
}

function initiateHeader(res) {
  res.set({
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff"
  });
  return res;
}

app.get("/topics", (req, res) =>
  {
    initiateHeader(res).send(JSON.stringify(topics.topicNames));
  }
);

app.get("/chinese_numbers", (req, res) =>
  {
    initiateHeader(res).send(randomMessage(chineseNumbers.chineseNumbers));
  }
);

app.get("/jokes", (req, res) =>
  {
    initiateHeader(res).send(randomMessage(jokes.jokes));
  }
);

app.get("/european_capitals", (req, res) =>
  {
    initiateHeader(res).send(randomMessage(europeanCapitals.europeanCapitals));
  }
);

app.get("/mathematical_constants", (req, res) =>
  {
    initiateHeader(res).send(randomMessage(mathematicalConstants.mathematicalConstants));
  }
);

app.listen(port, () => console.log("Listening on port ${port}!"));

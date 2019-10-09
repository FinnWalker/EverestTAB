const mongoose = require("./js/mongoose.js");

const Treadmill = require("./js/treadmill.js");
require("./js/initialiseTreadmills.js")();
require("./js/initialiseProgress.js")();
const Player = require("./js/player.js");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.io = io;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

const form = require("./js/form.js");
const step = require("./js/step.js");
const play = require("./js/play.js");
const players = require("./js/players.js");
const activePlayers = require("./js/activePlayers.js");
const horse = require("./js/horse.js");

const admin = require("./js/admin.js");
//const signature = require('./js/signature.js');

const cors = require("cors");

app.use(cors());

app.post("/form", form);
app.post("/step", step);
app.post("/play", play);
app.get("/players", players);
app.post("/admin_settings", admin);
//app.post('/signature', signature);

app.post("/signature", (req, res) => {
  //console.log(req.body);

  var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
  require("fs").writeFile(
    `./signatures/${req.body.id}.png`,
    base64Data,
    "base64",
    function (err) {
      if (err) console.log(err);
    }
  );
  res.json({});
});

setInterval(() => {
  Treadmill.find({})
    .sort("name")
    .exec(function (err, treadmills) {
      if (err) {
        console.log(err);
      } else {
        for (let treadmill of treadmills) {
          if (treadmill.time > 0) {
            treadmill.time -= 1;
            if (treadmill.time == 0) {
              Player.findOne({ id: treadmill.player }, function (err, player) {
                if (err) console.log(err);
                else if (player) {
                  player.current_steps = 0;
                  player.save();
                }
              });
              treadmill.player = "none";
            }
            treadmill.save();
            io.emit("treadmill", {
              name: treadmill.name,
              time: treadmill.time
            });
          }
        }
      }
    });
  let leaderboard = [];
  Player.find({})
    .sort({ steps: -1 })
    .limit(5)
    .exec(function (err, players) {
      if (err) {
        console.log(err);
      } else if (players) {
        for (let player of players) {
          leaderboard.push({ name: player.player_name, steps: player.steps });
        }
        io.emit("leaderboard", leaderboard);
      }
    });

  let most_step_leaderboard = [];
  Player.find({})
    .sort({ most_steps: -1 })
    .limit(5)
    .exec(function (err, players) {
      if (err) {
        console.log(err);
      } else if (players) {
        for (let player of players) {
          most_step_leaderboard.push({ name: player.player_name, most_steps: player.most_steps });
        }
        io.emit("most-step-leaderboard", most_step_leaderboard);
      }
    });
}, 1000);

io.on("connection", function (socket) {
  console.log("a user connected");
  activePlayers(socket);
  horse(socket);
});

const port = 3000;
http.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}!`));

const sanitize = require("mongo-sanitize");
const Treadmill = require("./treadmill.js");
const Player = require("./player.js");

function play(req, res) {
  const treadmill = sanitize(req.body.treadmill);
  const player = sanitize(req.body.player);

  if (treadmill !== null && player !== null) {
    Treadmill.findOne({ name: treadmill }, function(err, treadmill) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the treadmill" });
      } else {
        if (treadmill) {
          Player.findOne({ id: player }, function(err, player) {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: "There was an error finding the player"
              });
            } else if (player) {
              treadmill.player = player.id;
              treadmill.time = 300;
              treadmill.save().then(() => {
                req.app.io.emit('play', {treadmill: treadmill.name, player: player.player_name, steps: player.steps});
                res
                .status(200)
                .json({ message: "Player added to treadmill" });
              });
            } else {
              res
                .status(300)
                .json({ message: "Player not found" });
            }
          });
        }
      }
    });
  } else {
    res.status(300).json({ message: "Please include all fields" });
  }
}

module.exports = play;

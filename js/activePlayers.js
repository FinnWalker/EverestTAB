const Treadmill = require("./treadmill.js");
const Player = require("./player.js");

function activePlayers(socket) {
  Treadmill.find({}).sort('name').exec(function(err, treadmills) {
    let players = [];

    function asyncLoop(i, cb) {
      if (i < treadmills.length) {
        Player.findOne({ id: treadmills[i].player }, function(err, player) {
          if (err) {
            console.log(err);
          } else if (player) {
            players.push({name: player.player_name, time: treadmills[i].time, steps: player.steps});
          } else {
            players.push({name: "", time:0, steps: 0});
          }
          asyncLoop(i + 1, cb);
        });
      } else {
          cb();
      }
    }

    asyncLoop(0, () => {
     socket.emit('active-players', players);

    });
  });
}

module.exports = activePlayers;

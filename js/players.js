const Player = require("./player.js");

function players(req, res) {
    Player.find({}, function(err, players) {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "There was an error finding players" });
      } else {
        if (players) {
            res.status(200).json({ players });
        }
    }
})
}

module.exports = players;
const Treadmill = require("./treadmill.js");

function initialiseTreadmills() {
  for (let mill = 0; mill < 4; mill++) {
    Treadmill.findOne({ name: mill }, function(err, treadmill) {
      if (err) {
        console.log(err);
      } else if (!treadmill) {
        const newTreadmill = new Treadmill({
          name: mill.toString(),
          player: "none",
          time: 0
        });
        newTreadmill.save();
      }
    });
  }
}

module.exports = initialiseTreadmills;

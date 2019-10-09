const sanitize = require("mongo-sanitize");
const Treadmill = require("./treadmill.js");
const Player = require("./player.js");
const Progress = require('./progress.js');

function step(req, res) {
  const step = sanitize(req.body.step);
  const treadmill = sanitize(req.body.treadmill);

  if (step !== null && treadmill !== null) {
    
    Treadmill.findOne({ name: treadmill }, function(err, treadmill) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: "There was an error finding the treadmill" });
      } else {
        if (treadmill) {
          Player.findOne({ id: treadmill.player }, function(err, player) {
            if (err) {
              console.log(err);
              res.status(500).json({
                message:
                  "There was an error finding the player on the treadmill"
              });
            } else if (player) {
              player.steps = parseInt(player.steps) + parseInt(step);
              player.current_steps = parseInt(player.current_steps) + parseInt(step);
              if (player.current_steps > player.most_steps) player.most_steps = player.current_steps;
              player.save().then(() => {
                req.app.io.emit('step', {treadmill: treadmill.name, steps: player.steps});
                res.status(200).json({ player });
              });
              Progress.findOne({}, function(err, progress) {
                if (err) {
                  console.log(err);
                } else if (progress) {
                  progress.total = parseFloat(progress.total) + (parseInt(step) * parseFloat(progress.weight));
                  if (parseFloat(progress.total) > 1/6 * parseFloat(progress.goal) && !progress.milestone_1) {
                    progress.milestone_1 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 1 !!!');
                  } else if (parseFloat(progress.total) > 2/6 * parseFloat(progress.goal) && !progress.milestone_2) {
                    progress.milestone_2 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 2 !!!');
                  }else if (parseFloat(progress.total) > 3/6 * parseFloat(progress.goal) && !progress.milestone_3) {
                    progress.milestone_3 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 3 !!!');
                  }else if (parseFloat(progress.total) > 4/6 * parseFloat(progress.goal) && !progress.milestone_4) {
                    progress.milestone_4 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 4 !!!');
                  }else if (parseFloat(progress.total) > 5/6 * parseFloat(progress.goal) && !progress.milestone_5) {
                    progress.milestone_5 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 5 !!!');
                  }else if (parseFloat(progress.total) >= parseFloat(progress.goal) && !progress.milestone_6) {
                    progress.milestone_6 = true;
                    req.app.io.emit('milestone');
                    console.log('yay, milestone 6 !!!');
                  }
                  progress.save();
                  const percentage = 100 * parseFloat(progress.total) / parseInt(progress.goal);
                  req.app.io.emit('horse', {percentage});
                }
              });
            } else {
              res
                .status(300)
                .json({ message: "No player found on the treadmill" });
            }
          });
        }
      }
    });
  } else {
    res.status(300).json({ message: "Please include all fields" });
  }
}

module.exports = step;

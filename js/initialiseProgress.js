const Progress = require("./progress.js");

function initialiseProgress() {
  Progress.findOne({}, function(err, progress) {
    if (err) {
      console.log(err);
    } else if (!progress) {
      const newProgress = new Progress({
        goal: 500000,
        total: "0",
        weight: "100",
        milestone_1: false,
        milestone_2: false,
        milestone_3: false,
        milestone_4: false,
        milestone_5: false,
        milestone_6: false
      });
      newProgress.save();
    }
  });
}

module.exports = initialiseProgress;

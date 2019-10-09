const sanitize = require("mongo-sanitize");
const Progress = require("./progress.js");

function admin(req, res) {
  const reset = sanitize(req.body.reset);
  const weight = sanitize(req.body.weight);

  if (reset) {
    Progress.findOne({}, function(err, progress) {
      if (err) {
        console.log(err);
      } else if (progress) {
        progress.total = "0";
        progress.weight = weight;
        progress.milestone_1 = false;
        progress.milestone_2 = false;
        progress.milestone_3 = false;
        progress.milestone_4 = false;
        progress.milestone_5 = false;
        progress.milestone_6 = false;
        progress.save();
      }
    });
  }
  else {
    Progress.findOne({}, function(err, progress) {
      if (err) {
        console.log(err);
      } else if (progress) {
        progress.weight = weight;
        progress.save();
      }
    });
  }
  res.json({});
}

module.exports = admin;

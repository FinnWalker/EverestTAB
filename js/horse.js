const Progress = require("./progress.js");

function horse(socket) {
  Progress.find({}, function(err, treadmills) {
    Progress.findOne({}, function(err, progress) {
      if (err) {
        console.log(err);
      } else if (progress) {
        const percentage = 100 * parseFloat(progress.total) / parseInt(progress.goal);
        socket.emit("horse", { percentage });
      }
    });
  });
}

module.exports = horse;

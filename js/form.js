const sanitize = require("mongo-sanitize");
const Player = require("./player.js");
const uuid = require("uuid");

function form(req, res) {

  console.log('test');

  const eligible = sanitize(req.body.eligible);
  const terms = sanitize(req.body.terms);
  const first_name = sanitize(req.body.first_name);
  const last_name = sanitize(req.body.last_name);
  const player_name = sanitize(req.body.player_name);
  const date_of_birth = sanitize(req.body.date_of_birth);
  const mobile = sanitize(req.body.mobile);
  const email = sanitize(req.body.email);
  const customer = sanitize(req.body.customer);
  const marketing = sanitize(req.body.marketing);

  if (
    eligible !== null &&
    terms !== null &&
    first_name !== null &&
    last_name !== null &&
    player_name !== null &&
    date_of_birth !== null &&
    mobile !== null &&
    email !== null &&
    customer !== null &&
    marketing !== null
  ) {

    function findPlayer(num_of_players, name_postfix) {
      Player.findOne({ player_name: `${player_name}${name_postfix}` }, function(
        err,
        player
      ) {
        if (player) {
          console.log(player);
          findPlayer(num_of_players + 1, `_${num_of_players + 1}`);
        } else {
          const newPlayer = new Player({
            id: uuid.v4(),
            eligible,
            terms,
            first_name,
            last_name,
            player_name: `${player_name}${name_postfix}`,
            date_of_birth,
            mobile,
            email,
            customer,
            marketing,
            steps: 0,
            current_steps: 0,
            most_steps: 0
          });
          newPlayer.save().then(() => {
            res
              .status(200)
              .json({ message: "Player added", player: newPlayer });
          });
        }
      });
    }
    findPlayer(0, "");
  } else {
    res.status(300).json({ message: "Please include all fields" });
  }
}

module.exports = form;

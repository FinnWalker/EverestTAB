
var myCanvas = document.getElementById('confetti-canvas');

var myConfetti = confetti.create(myCanvas, { resize: true });

const leaderboard_text = document.getElementById('leaderboard-text');
const most_steps_leaderboard_text = document.getElementById('most-steps-leaderboard-text');

const leaderboards = [document.getElementById('leaderboard'), document.getElementById('most-step-leaderboard')];

const player_elements = [
  document.getElementById("player0"),
  document.getElementById("player1"),
  document.getElementById("player2"),
  document.getElementById("player3")
];
const time_elements = [
  document.getElementById("time0"),
  document.getElementById("time1"),
  document.getElementById("time2"),
  document.getElementById("time3")
];
const steps_elements = [
  document.getElementById("steps0"),
  document.getElementById("steps1"),
  document.getElementById("steps2"),
  document.getElementById("steps3")
];

const socket = io();

socket.on("treadmill", treadmill => {
  minutes = "" + parseInt(parseInt(treadmill.time) / 60);
  seconds = parseInt(treadmill.time) % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = "" + seconds;
  }
  time_elements[treadmill.name].innerHTML = minutes + ":" + seconds;
  if (treadmill.time === 0) {
    /*
    player_elements[treadmill.name].innerHTML = "_";
    steps_elements[treadmill.name].innerHTML = "0<span style='font-size: 3vmin'> STEPS</span>";
    */
  }
});

socket.on("leaderboard", leaderboard => {
  let leaderboard_text_temp = "<div class='text-align-center'><i>Total Steps</i></div><hr>";
  let player = null;
  for(let i = 0; i < leaderboard.length; i++) {
    player = leaderboard[i];
    leaderboard_text_temp += `<span style="font-size: 3vmin; font-family: gilroy_bold">${player.name}</span> | ${player.steps}<br>`;
    if(i !== leaderboard.length - 1) {
      leaderboard_text_temp += '<hr>';
    }
  }
  leaderboard_text.innerHTML = leaderboard_text_temp;
});

socket.on("most-step-leaderboard", leaderboard => {
  let leaderboard_text_temp = "<div class='text-align-center'><i>Steps in 5 minutes</i></div><hr>";
  let player = null;
  for(let i = 0; i < leaderboard.length; i++) {
    player = leaderboard[i];
    leaderboard_text_temp += `<span style="font-size: 3vmin; font-family: gilroy_bold">${player.name}</span> | ${player.most_steps}<br>`;
    if(i !== leaderboard.length - 1) {
      leaderboard_text_temp += '<hr>';
    }
  }
  most_steps_leaderboard_text.innerHTML = leaderboard_text_temp;
});

socket.on("play", data => {
  time_elements[data.treadmill].innerHTML = "5:00";
  player_elements[data.treadmill].innerHTML = data.player;
  steps_elements[data.treadmill].innerHTML = data.steps  + "<span style='font-size: 3vmin'> STEPS</span>";
});

socket.on("step", data => {
  steps_elements[data.treadmill].innerHTML = data.steps + "<span style='font-size: 3vmin'> STEPS</span>";
});

socket.on("horse", data => {
  let percentage = parseFloat(data.percentage);
  if (percentage > 100) percentage = 100;
  updateHorse(percentage);
});

socket.on("milestone", () => {
  myConfetti({
    particleCount: 4000,
    spread: 180,
    startVelocity: 180,
    ticks: 2000,
    origin: {
        y: 2
    },
    colors: ['#32e97f', '#018543', '#0a672e'],
  });
  document.getElementById('milestone-popup').classList.add('pop-up');
  console.log("YAY milestone reached !!");
  setTimeout(() => {
    document.getElementById('milestone-popup').classList.remove('pop-up');
  }, 16500);
});

socket.on("active-players", players => {
  for (let player = 0; player < players.length; player++) {
    player_elements[player].innerHTML = players[player].name;
    if (player_elements[player].innerHTML === "")
      player_elements[player].innerHTML = "_";
    steps_elements[player].innerHTML = players[player].steps + "<span style='font-size: 3vmin'> STEPS</span>";

    minutes = "" + parseInt(parseInt(players[player].time) / 60);
    seconds = parseInt(players[player].time) % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = "" + seconds;
    }
    time_elements[player].innerHTML = minutes + ":" + seconds ;

  }
});


let current_board = 0;
setInterval(() => {
  leaderboards[current_board].classList.remove('left');
  current_board = (current_board + 1)%2;
  leaderboards[current_board].classList.add('left');
}, 15000);
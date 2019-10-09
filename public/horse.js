const horse = document.getElementById("horse");

let milestones = [0,0,0,0,0,0,0];

function updateHorse(progress) {
  const x = (progress * 2550) / 100 + 1200;
  horse.style.transform = "Rotate(" + 70 * Math.pow(x / 5000, 1.2) + "deg)";

  horse.style.left = ((4920 - x) / 5000) * window.innerWidth + "px";
  horse.style.top =
    ((1850 - Math.pow(1.73, x / 580 + 7.4) - 200) / 2100) *
      (window.innerWidth * 0.34) +
    "px";

  if(progress === 100 && !milestones[6]) {
    const flag = document.getElementById("flag-7");
    flag.classList.remove('grayscale');
    flag.classList.add('win');
    milestones[6] = 1;
  } if (progress > 5*100/6 && !milestones[5]) {
    const flag = document.getElementById("flag-6");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[5] = 1;
  } if (progress > 4*100/6 && !milestones[4]) {
    const flag = document.getElementById("flag-5");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[4] = 1;
  } if (progress > 3*100/6 && !milestones[3]) {
    const flag = document.getElementById("flag-4");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[3] = 1;
  } if (progress > 2*100/6 && !milestones[2]) {
    const flag = document.getElementById("flag-3");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[2] = 1;
  } if (progress > 1*100/6 && !milestones[1]) {
    const flag = document.getElementById("flag-2");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[1] = 1;
  } if (progress >= 0 && !milestones[0]) {
    const flag = document.getElementById("flag-1");
    flag.classList.remove('grayscale');
    flag.classList.add('bounce');
    milestones[0] = 1;
  }
}

/*
        progress = 0;
        last_frame = null
        function update(timestamp) {
            if(last_frame === null) last_frame = timestamp;
            const delta_time = timestamp - last_frame;
            last_frame = timestamp;

            progress = (progress + delta_time/50);
            if (progress > 100) progress = 100;
            updateHorse(progress);
            window.requestAnimationFrame(update);
        }

        window.requestAnimationFrame(update);
        */

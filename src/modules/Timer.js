const Timer = (date) => {
  const timerHour = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds');

  const getTimerRemaining = (date) => {
    const nowDate = Date.now(),
      stopDate = new Date(date).getTime(),
      remaining = (stopDate - nowDate) / 1000,
      seconds = Math.floor(remaining % 60),
      minutes = Math.floor((remaining / 60) % 60),
      hour = Math.floor(remaining / 60 / 60);
    return {
      remaining,
      hour,
      minutes,
      seconds
    };
  };

  const updateClock = () => {
    const timer = getTimerRemaining(date);

    if (timer.remaining < 0) {
      restart();
    } else {
      timerHour.textContent = timer.hour > 9 ? timer.hour : `0${timer.hour}`;
      timerMinutes.textContent =
        timer.minutes > 9 ? timer.minutes : `0${timer.minutes}`;
      timerSeconds.textContent =
        timer.seconds > 9 ? timer.seconds : `0${timer.seconds}`;
    }
  };

  function startTimer() {
    setInterval(updateClock, 1000);
  }

  function restart() {
    date = new Date();
    clearInterval(startTimer);
    getTimerRemaining(date.setDate(date.getDate() + 1));
    startTimer();
  }

  startTimer();
};

export default Timer;
window.addEventListener('DOMContentLoaded', () => {
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
      return { remaining, hour, minutes, seconds };
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

  Timer('14 November 2021');

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      closeMenu = document.querySelector('.close-btn'),
      menu = document.querySelector('menu'),
      menuItem = menu.querySelectorAll('ul>li'),
      scrollWidget = document.querySelector('main>a');

    const smoothScroll = (item) => {
      console.log(item);
      const anchors = document
        .querySelector('a[href*="#"]')
        .getAttribute('href')
        .substr(1);

      document.querySelector(`#${anchors}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    const handleMenu = () => menu.classList.toggle('active-menu');

    btnMenu.addEventListener('click', () => handleMenu());

    closeMenu.addEventListener('click', () => handleMenu());

    menuItem.forEach((item) =>
      item.addEventListener('click', (e) => {
        e.preventDefault();
        handleMenu();
        smoothScroll(item);
      })
    );

    scrollWidget.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(scrollWidget);
    });
  };

  toggleMenu();

  const popup = () => {
    const btnPopup = document.querySelectorAll('.popup-btn'),
      closePopup = document.querySelector('.popup-close'),
      popupModal = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content');

    const modalAnimation = () => {
      if (screen.width > 768) {
        let start = 0;
        requestAnimationFrame(function anim() {
          popupContent.style.left = `${(start += 3)}%`;
          start < 38 && requestAnimationFrame(anim);
        });
      }
    };

    btnPopup.forEach((item) => {
      item.addEventListener('click', () => {
        popupModal.style.display = 'block';
        modalAnimation();
      });
    });

    closePopup.addEventListener(
      'click',
      () => (popupModal.style.display = 'none')
    );
  };

  popup();
});

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
      menu = document.querySelector('menu'),
      menuItem = menu.querySelectorAll('ul>li');

    const smoothScroll = (item) => {
      const anchors = item.getAttribute('href').substr(1);
      document.querySelector(`#${anchors}`).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };

    const handleMenu = () => menu.classList.toggle('active-menu');

    document.body.addEventListener('click', (e) => {
      const target = e.target,
        targetMenu = target.closest('menu'),
        targetButton = e.target.closest('.menu');

      targetButton === btnMenu && handleMenu();

      if (!targetMenu && !(targetButton === btnMenu)) {
        menu.classList.remove('active-menu');
      }

      e.preventDefault();

      if (target.classList.contains('close-btn')) {
        handleMenu();
      }

      menuItem.forEach((item, i) => {
        if (item.childNodes[0] === target) {
          handleMenu();
          smoothScroll(target);
        }
      });

    });
  };

  toggleMenu();

  const toglePopup = () => {
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

    popupModal.addEventListener('click', (event) => {
      const target = event.target;

      if (target.classList.contains('popup-close')) {
        popupModal.style.display = 'none';
      }
      if (!target.closest('.popup-content')) {
        popupModal.style.display = 'none';
      }
    });
  };

  toglePopup();

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTableContent = (index) => {
      tabContent.forEach((item, i) => {
        if (index === i) {
          item.classList.remove('d-none');
          tab[i].classList.add('active');
        } else {
          item.classList.add('d-none');
          tab[i].classList.remove('active');
        }
      });
    };

    tabHeader.addEventListener('click', (event) => {
      const target = event.target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => item === target && toggleTableContent(i));
      }
    });
  };

  tabs();
});

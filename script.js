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

const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const smoothScroll = (item) => {
        const anchors = item.getAttribute('href').substr(1);
        document.querySelector(`#${anchors}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const handleMenu = () => menu.classList.toggle('active-menu');

    document.body.addEventListener('click', (e) => {
        const target = e.target;

        !target.matches('menu, ul>li') && menu.classList.remove('active-menu');
        target.closest('.menu, ul>li>a') && handleMenu();

        e.preventDefault();

        if (target.closest('a') && target.closest('menu')) {
            handleMenu();
            smoothScroll(target.closest('a'));
        } else if (target.closest('a') && target.closest('main')) {
            smoothScroll(target.closest('a'));
        }
    });
};

const togglePopup = () => {
    const btnPopup = document.querySelectorAll('.popup-btn'),
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
            const requestMSG = document.querySelector('.request-message');
            requestMSG && requestMSG.remove();

            popupModal.style.display = 'none';
        }
        if (!target.closest('.popup-content')) {
            popupModal.style.display = 'none';
        }
    });
};

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

const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content'),
        portfolioDots = document.querySelector('.portfolio-dots');

    const child = new Array(slide.length).fill().map((item, i) => {
        const li = document.createElement('li');
        li.classList.add('dot');
        i === 0 && li.classList.add('dot-active');
        return li;
    });
    portfolioDots.append(...child);

    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlider = () => {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        dot[currentSlide].classList.remove('dot-active');

        currentSlide++;

        currentSlide >= slide.length && (currentSlide = 0);

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlider = (time = 1500) => {
        interval = setInterval(autoPlaySlider, time);
    };

    const stopSlider = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
        } else if (target.matches('#arrow-left')) {
            currentSlide--;
        } else if (target.matches('.dot')) {
            dot.forEach((item, i) => {
                if (item === target) {
                    currentSlide = i;
                }
            });
        }

        currentSlide >= slide.length && (currentSlide = 0);
        currentSlide < 0 && (currentSlide = slide.length - 1);

        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')) stopSlider();
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')) startSlider();
    });

    startSlider(1500);
};

const comand = () => {
    const photo = document.querySelectorAll('.command__photo');

    photo.forEach((item, i) => {
        const attribute = item.getAttribute('src');

        item.addEventListener('mouseover', (e) => {
            e.target.src = e.target.dataset.img;
        });
        item.addEventListener('mouseout', (e) => {
            e.target.src = attribute;
        });
    });
};

const calcValidate = () => {
    const calcItem = document.querySelectorAll('.calc-item');

    calcItem.forEach((item) => {
        item.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });
    });
};

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const animeValue = (total) => {
        let n = 0;
        const time = 20,
            step = 10;

        const t = Math.round(time / (total / step));

        const interval = setInterval(() => {
            n = n + step;
            if (n == total) {
                clearInterval(interval);
            }
            totalValue.textContent = n;
        }, t);
    };

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
            animeValue(total);
        }
    };

    calcBlock.addEventListener('change', (event) => {
        const target = event.target;

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        succesMesaage = 'Спасибо! Мы скоро свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';
    statusMessage.classList.add('request-message');

    const clearInputs = (inputs) => {
        inputs.forEach((item) => (item.value = ''));
    };


    const postData = (data) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify(data),
        });
    };

    const getData = (form) => {

        form.appendChild(statusMessage);

        const formData = new FormData(form);
        const body = {};
        formData.forEach((item, key) => {
            body[key] = item;
        })

        if (!body) return

        statusMessage.textContent = loadMessage;

        postData(formData)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200');
                };
                statusMessage.textContent = succesMesaage;
            })
            .catch(() => statusMessage.textContent = errorMessage);
    };

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('form-btn') && e.target.closest('form')) {
            e.preventDefault();

            const inputs = e.target.closest('form').querySelectorAll('input');

            getData(e.target.closest('form'));
            clearInputs(inputs);
        }
    });
};




Timer('16 November 2021');
toggleMenu();
togglePopup();
tabs();
slider();
comand();
calcValidate();
calc(100);
sendForm();
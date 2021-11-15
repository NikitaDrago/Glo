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

export default slider;

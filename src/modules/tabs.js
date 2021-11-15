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

export default tabs;
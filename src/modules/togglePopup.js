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

export default togglePopup;

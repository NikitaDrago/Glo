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

export default toggleMenu;
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

export default comand;
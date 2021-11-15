const calcValidate = () => {
    const calcItem = document.querySelectorAll('.calc-item');

    calcItem.forEach((item) => {
        item.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });
    });
};

export default calcValidate;
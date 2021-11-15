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

export default sendForm;

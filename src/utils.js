// проверка значения (не меньше 10 символов)
export const isValid = value => {

    return value.length >= 10

}

// модальное окно
export const createModal = (title, content) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <h1>${title}</h1>
        <div class="modal-content">${content}</div>
    `
    // активация( по инструкции MUI)
    mui.overlay('on', modal);
}
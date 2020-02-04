import {Question} from './question'
import {isValid} from './utils'
import './styles.css'

// *** Константы
const form = document.querySelector('#question-form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#question-submit');

// *** Функции

const submitFormHandler = e => {
    e.preventDefault();

    if( isValid(input.value) ){

        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        // пока не ушел запрос отлючим кнопку чтоб избежать спам
        submitBtn.disabled = true;

        // Отправка и сохранение вопроса 
        Question.create(question)
            .then(() => {
                // очищаем поле инпута
                input.value = '';
                // снимаем с инпута встроенную MUI валидацию
                input.className = ''
                // разблокируем кнопку
                submitBtn.disabled = false;
            });
    }
}

// *** Обработчики

// отправка формы
form.addEventListener('submit', submitFormHandler);

// разблокировка кнопки, при корректном значении в инпуте
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

// Рендер наших вопросов после перезгарузки страницы
window.addEventListener('load', Question.renderList);



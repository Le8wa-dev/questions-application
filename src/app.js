import {Question} from './question'
import {isValid, createModal} from './utils'
import {getAuthForm, authWidthEmailAndPassword} from './auth'
import './styles.css'

// *** Константы
const form = document.querySelector('#question-form');
const modalBtn = document.querySelector('#modal-btn');
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

// открытие формы авторизации
const openModal = () => {
    createModal('Авторизация', getAuthForm());

    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true});
}

// убираем перезагрузку страницы после авторизации
// пишем логику по авторизации
const authFormHandler = e => {
    e.preventDefault();

    // получим значения
    const btn = e.target.querySelector('button')
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;

    btn.disabled = true;
    authWidthEmailAndPassword(email, password)
        .then(token => {
            return Question.fetch(token)
        })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

const renderModalAfterAuth = content => {
    if(typeof content === 'string') {
        createModal('Ошибка', content)
    } else {
        createModal('Список вопросов', Question.listToHTML(content))
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

// Открытие модального окна
modalBtn.addEventListener('click', openModal)



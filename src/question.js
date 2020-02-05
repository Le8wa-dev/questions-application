export class Question {
    static create(question) {
        return fetch('https://questions-podcast.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static fetch(token) {
        if(!token) {
            return Promise.resolve('<p class="error">У вас отсутствует токен</p>')
        }
        return fetch(`https://questions-podcast.firebaseio.com/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if(response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static renderList() {
        const questions = getQuestionFromLocalStorage();

        // вносим вопросы  в переменную
        const html = questions.length
            ? questions.map(toCard).join('')
            : `<div class="mui--text-headline">Вы пока ничего не спросили</div>`

        // контейнер с заданными вопросами
        const list = document.getElementById('list');
        // бавляем вопросы на страницу
        list.innerHTML = html;
    }

    static listToHTML (questions) {
        return questions.length 
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }
}

// Добавление в local
const addToLocalStorage = question => {
    // получаем данные
    const all = getQuestionFromLocalStorage();
    // добавялем вновь заданный вопрос
    all.push(question);
    // отправляем новые наддые в storage
    localStorage.setItem('questions', JSON.stringify(all));
}

// Получение данных с local
const getQuestionFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

// создаем карточку с вопросом
const toCard = question => {
    return `
        <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>${question.text}</div>
        <br>
    `
}